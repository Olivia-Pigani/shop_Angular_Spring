import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FooterComponent } from "../../shared/footer/footer.component";
import {ReactiveFormsModule, FormBuilder, Validators,FormGroup} from '@angular/forms';
import { AuthService } from '../auth.service';
import { SignUpRequest } from './sign-up-request';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NavbarComponent, RouterLink, RouterLinkActive, FooterComponent,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
private formBuilder:FormBuilder = inject(FormBuilder);
private authService: AuthService = inject(AuthService);
private destroyRef: DestroyRef = inject(DestroyRef);
public signUpForm!: FormGroup;

ngOnInit(): void {
this.signUpForm = this.formBuilder.group({
  // firstName: ['',[Validators.required,Validators.min(1)]],
  // lastName: ['',[Validators.required,Validators.min(1)]], 
  // birthDate: ['',[Validators.required]],
  // phoneNumber: ['',[Validators.required, Validators.length == 10]],
  // email:  ['',[Validators.required, Validators.email]],
  // password: ['',[Validators.required,Validators.min(6)]]

  firstName: ['',[Validators.required,Validators.minLength(1)]],
  lastName: ['',[Validators.required,,Validators.minLength(1)]], 
  birthDate: ['',[Validators.required]],
  phoneNumber: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
  email:  ['',[Validators.required,Validators.email]],
  password: ['',[Validators.required,,Validators.minLength(6)]]
})  
}


public onSubmit(){
  if(!this.signUpForm.valid){
    return;
  }
  this.authService.signUp(this.signUpForm.value as SignUpRequest)
  .pipe(
    takeUntilDestroyed(this.destroyRef)
  ).subscribe();
}

}

