import { Component, DestroyRef, OnInit, effect, inject } from '@angular/core';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";
import { FooterComponent } from "../../../shared/footer/footer.component";
import {ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { LoginRequest } from '../login-request';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EMPTY, catchError } from 'rxjs';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,ReactiveFormsModule,RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{

  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  public signInForm!: FormGroup;
  public isFormValid:boolean = true;
  public isFormSubmitted:boolean = false;

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });
  }
 
  public onSubmit(){

    this.isFormSubmitted = true;

    if(!this.signInForm.valid){
      this.isFormValid = false;
      return;
    }
    this.authService.login(this.signInForm.value as LoginRequest)
    .pipe(
      catchError(()=>{
        this.isFormValid = false;
        return EMPTY;
      }
      ),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(()=>
      this.isFormValid = true
    );
  }

}
