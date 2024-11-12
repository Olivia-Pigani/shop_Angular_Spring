import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  EffectRef,
  OnInit,
  Signal,
  WritableSignal,
  effect,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Address } from '../address';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { EMPTY, catchError } from 'rxjs';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css',
})
export class AddressFormComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private addressService: AddressService = inject(AddressService);
  private destroyRef: DestroyRef = inject(DestroyRef);

  public address: WritableSignal<Address> = this.addressService.customerAddress;
  
  public addressInfoForm!: FormGroup;
  public initialAddressData: Address | undefined;
  public isAddressFormValid: boolean = true;
  public isAddressFormSubmitted: boolean = false;

  public displayCustomerDataEffect: EffectRef = effect(() => {
    this.initialAddressData = this.address();
    if (this.initialAddressData) {
      this.updateFormWithAddressData(this.initialAddressData);
    }
  });

  ngOnInit(): void {
    this.addressInfoForm = this.formBuilder.group({
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
    });
  }

  public onSubmitAddressInfo() {
    if (!this.addressInfoForm.valid) {
      this.isAddressFormValid = false;
      return;
    }
    const addressData = this.addressInfoForm.value as Address;

    if (this.isTheSameAddressData(addressData)) {
      this.isAddressFormValid = false;
      return;
    }

    //if customer do not have address yet: save, if not: update
    if (!this.address()) {
      this.addressService
        .saveAddressByCustomerId(addressData)
        .pipe(
          catchError(() => {
            this.isAddressFormValid = false;
            return EMPTY;
          }),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
          this.isAddressFormValid = true;
          this.isAddressFormSubmitted = true;
        });
        
      return;
    }

    this.addressService
      .updateAddressByCustomerId(addressData)
      .pipe(
        catchError(() => {
          this.isAddressFormValid = false;
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.isAddressFormValid = true;
        this.isAddressFormSubmitted = true;
      });
  }

  public closeAddressFormSuccessMsg(): void {
    this.isAddressFormSubmitted = false;
  }

  private isTheSameAddressData(updatedAddressData: Address): boolean {
    return (
      JSON.stringify(this.initialAddressData) ===
      JSON.stringify(updatedAddressData)
    );
  }

  private updateFormWithAddressData(address: Address) {
    this.addressInfoForm.patchValue({
      country: address.country,
      city: address.city,
      street: address.street,
      houseNumber: address.houseNumber,
    });
  }
}
