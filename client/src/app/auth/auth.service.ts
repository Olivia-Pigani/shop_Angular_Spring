import { Injectable, inject, DestroyRef, signal, WritableSignal } from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {Router} from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import { User } from './user.interface';
import { LoginRequest } from './login/login-request';
import { Observable, catchError, map, of,tap } from 'rxjs';
import { LoginResponse } from './login/login-response';
//import {IS_PUBLIC} from "./auth.interceptor";
import { HttpStatusCode } from '@angular/common/http';
import { SignUpRequest } from './signup/sign-up-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly jwtHelper = inject(JwtHelperService);
  private readonly destroyRef = inject(DestroyRef);
  private authUrl: string = 'http://localhost:8586/api/v1/auth';

  public get user(): WritableSignal<User|null>{
    const token = localStorage.getItem('token');
    return signal(token ? this.jwtHelper.decodeToken(token) : null);
  }

  public login(loginRequest:LoginRequest):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.authUrl}/signin`, loginRequest)
    .pipe(

      //if 401
      catchError(error => {
       if(error === HttpStatusCode.Unauthorized){
          console.error('invalid credentials');
        }
        return of();
      }),

      tap(data => {
        if(data.token){
          localStorage.setItem('token',data.token);
          console.log("the user has sign in");
          this.router.navigate(["/homepage"]);
        }
  })
    );
  }

  public signUp(signUpRequest: SignUpRequest):Observable<void>{
    return this.http.post<void>(`${this.authUrl}/signup`,signUpRequest)
    .pipe(

      catchError(error => {
          if(error === HttpStatusCode.Conflict){ //if 409
            console.error("this email already exist")
            this.router.navigate(["/auth/signin"]);
          } if (error == HttpStatusCode.BadRequest) { //if 400
            console.error("something went wrong during sign up attempt")
          } 
          return of();
        }),

        tap(()=>{
          console.log("there is a new user registered !");
          this.router.navigate(["/auth/signin"]);
        }
        )
    )
  }
  

  

}
