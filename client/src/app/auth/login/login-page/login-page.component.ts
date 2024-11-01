import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { NavbarComponent } from "../../../shared/navbar/navbar.component";
import { FooterComponent } from "../../../shared/footer/footer.component";
import {ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { LoginRequest } from '../login-request';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [NavbarComponent, FooterComponent,ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{

  private formBuilder: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  public signInForm!: FormGroup;

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });
  }
 
  public onSubmit(){
    if(!this.signInForm.valid){
      return;
    }
    this.authService.login(this.signInForm.value as LoginRequest)
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

}
