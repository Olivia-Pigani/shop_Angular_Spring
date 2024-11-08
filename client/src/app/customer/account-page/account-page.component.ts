import { Component, EffectRef, OnInit, Signal, WritableSignal, effect, inject, signal } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { OrderCardComponent } from "../../orders/order-card/order-card.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { OrderListComponent } from "../../orders/order-list/order-list.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../customer';
import { Observable } from 'rxjs';
import { CustomerService } from '../customer.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [NavbarComponent, OrderCardComponent, FooterComponent, OrderListComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css'
})
export class AccountPageComponent implements OnInit{
private formBuilder:FormBuilder = inject(FormBuilder);
private customerService:CustomerService = inject(CustomerService);
public customer: Signal<Customer | undefined> = toSignal(this.customerService.customerDetails$);
public pageTitle:string = 'My Account';
public customerInfoForm!:FormGroup;

public effectCustomer: EffectRef = effect(()=>this.customer());

ngOnInit(): void {

  this.customerInfoForm = this.formBuilder.group({
    firstName: ['',[Validators.required,Validators.minLength(1)]],
    lastName: ['',[Validators.required,Validators.minLength(1)]], 
    birthDate: ['',[Validators.required]],
    phoneNumber: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    email:  ['',[Validators.required,Validators.email]],
    password: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]]
  }) 
}


public onSubmitCustomerInfo(){
  if(!this.customerInfoForm.valid){
    return;
  }
}


}
