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
  private destroyRef: DestroyRef = inject(DestroyRef);
  public customer: Signal<Customer | undefined> = toSignal(
    this.customerService.customerDetails$
  );
  public pageTitle: string = 'My Account';

  //about customer form
  public customerInfoForm!: FormGroup;
  public initialCustomerData: Customer | undefined;
  public isFormValid: boolean = true;
  public isFormSubmitted: boolean = false;

  public displayCustomerDataEffect: EffectRef = effect(() => {
    this.initialCustomerData = this.customer();
    if (this.initialCustomerData) {
      this.updateFormWithCustomerData(this.initialCustomerData);
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
  }

  public onSubmitCustomerInfo() {
    if (!this.customerInfoForm.valid) {
      this.isFormValid = false;
      return;
    }
    const updatedCustomerData = this.customerInfoForm.value as Customer;

    if (this.isTheSameData(updatedCustomerData)) {
      this.isFormValid = false;
      return;
    }

    this.customerService
      .updateCustomerById(updatedCustomerData)
      .pipe(
        catchError(() => {
          this.isFormValid = false;
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.isFormValid = true;
        this.isFormSubmitted = true;
      });
  }

  public closeSuccessMsg(): void {
    this.isFormSubmitted = false;
  }

  private isTheSameData(updatedCustomerData: Customer): boolean {
    return (
      JSON.stringify(this.initialCustomerData) ===
      JSON.stringify(updatedCustomerData)
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
}
