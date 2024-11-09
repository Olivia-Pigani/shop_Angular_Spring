import {
  Component,
  DestroyRef,
  EffectRef,
  OnInit,
  Signal,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { OrderCardComponent } from '../../orders/order-card/order-card.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { OrderListComponent } from '../../orders/order-list/order-list.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Customer } from '../customer';
import { EMPTY, Observable, catchError } from 'rxjs';
import { CustomerService } from '../customer.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { CommonModule, JsonPipe } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { Address } from '../address';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [
    NavbarComponent,
    OrderCardComponent,
    FooterComponent,
    OrderListComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css',
})
export class AccountPageComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private customerService: CustomerService = inject(CustomerService);
  private addressService: AddressService = inject(AddressService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  public customer: Signal<Customer | undefined> = toSignal(
    this.customerService.customerDetails$
  );
  public address: Signal<Address | undefined> = toSignal(
    this.addressService.addressDetails$
  );
  public pageTitle: string = 'My Account';

  //about customer form
  public customerInfoForm!: FormGroup;
  public initialCustomerData: Customer | undefined;
  public isCustomerFormValid: boolean = true;
  public isCustomerFormSubmitted: boolean = false;

  //about address form
  public addressInfoForm!: FormGroup;
  public initialAddressData: Address | undefined;
  public isAddressFormValid: boolean = true;
  public isAddressFormSubmitted: boolean = false;

  public displayCustomerDataEffect: EffectRef = effect(() => {
    this.initialCustomerData = this.customer();
    if (this.initialCustomerData) {
      this.updateFormWithCustomerData(this.initialCustomerData);
    }
    this.initialAddressData = this.address();
    if (this.initialAddressData) {
      this.updateFormWithAddressData(this.initialAddressData);
    }
  });

  ngOnInit(): void {
    this.customerInfoForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      birthDate: ['', [Validators.required]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
    });

    this.addressInfoForm = this.formBuilder.group({
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      street: ['', [Validators.required]],
      houseNumber: ['', [Validators.required]],
    });
  }

  public onSubmitCustomerInfo() {
    if (!this.customerInfoForm.valid) {
      this.isCustomerFormValid = false;
      return;
    }
    const updatedCustomerData = this.customerInfoForm.value as Customer;

    if (this.isTheSameCustomerData(updatedCustomerData)) {
      this.isCustomerFormValid = false;
      return;
    }

    this.customerService
      .updateCustomerById(updatedCustomerData)
      .pipe(
        catchError(() => {
          this.isCustomerFormValid = false;
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.isCustomerFormValid = true;
        this.isCustomerFormSubmitted = true;
      });
  }

  
  public onSubmitAddressInfo() {
    if (!this.addressInfoForm.valid) {
      this.isAddressFormValid = false;
      return;
    }
    const updatedAddressData = this.addressInfoForm.value as Address;

    if (this.isTheSameAddressData(updatedAddressData)) {
      this.isAddressFormValid = false;
      return;
    }

    this.addressService
      .updateAddressByCustomerId(updatedAddressData)
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

  public closeCustomerFormSuccessMsg(): void {
    this.isCustomerFormSubmitted = false;
  }
  public closeAddressFormSuccessMsg(): void {
    this.isAddressFormSubmitted = false;
  }

  private isTheSameCustomerData(updatedCustomerData: Customer): boolean {
    return (
      JSON.stringify(this.initialCustomerData) ===
      JSON.stringify(updatedCustomerData)
    );
  }

  private isTheSameAddressData(updatedAddressData: Address): boolean {
    return (
      JSON.stringify(this.initialAddressData) ===
      JSON.stringify(updatedAddressData)
    );
  }

  private updateFormWithCustomerData(customer: Customer) {
    this.customerInfoForm.patchValue({
      firstName: customer.firstName,
      lastName: customer.lastName,
      birthDate: customer.birthDate,
      phoneNumber: customer.phoneNumber,
      email: customer.email,
    });
  }

  private updateFormWithAddressData(address: Address) {
    this.addressInfoForm.patchValue({
      country:address.country,
      city:address.city,
      street:address.street,
      houseNumber:address.houseNumber
    });
  }
}
