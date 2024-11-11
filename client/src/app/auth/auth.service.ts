import {
  Injectable,
  inject,
  DestroyRef,
  signal,
  WritableSignal,
  Signal,
} from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from './user.interface';
import { LoginRequest } from './login/login-request';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { LoginResponse } from './login/login-response';
import { HttpStatusCode } from '@angular/common/http';
import { SignUpRequest } from './signup/sign-up-request';
import { BasketItem } from '../basket/basket-item';
import { BasketService } from '../basket/basket.service';
import { OrderService } from '../orders/order.service';
import { AddressService } from '../customer/address.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly jwtHelper = inject(JwtHelperService);
  private basketService: BasketService = inject(BasketService);
  private readonly destroyRef = inject(DestroyRef);
  private authUrl: string = 'http://localhost:8586/api/v1/auth';

  public basketItemList: Signal<BasketItem[]> =
    this.basketService.basketItemList.asReadonly();

  public get user(): WritableSignal<User | null> {
    const token = localStorage.getItem('token');
    return signal(token ? this.jwtHelper.decodeToken(token) : null);
  }

  //check if there is a token and if it's not outdated
  public get isLoggedIn(): WritableSignal<boolean> {
    const token: string | null = localStorage.getItem('token');
    if (token == null) {
      return signal(false);
    }
    return signal(!this.jwtHelper.isTokenExpired());
  }

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.authUrl}/signin`, loginRequest)
      .pipe(
        //if 401
        catchError((error) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            console.error('invalid credentials');
          }
          return of();
        }),

        tap((data) => {
          if (data.token) {
            localStorage.setItem('token', data.token);

            //if there is at least one item in the basket, signin will lead the user to basket page to make the order
            if (this.basketItemList().length) {
              this.router.navigate(['/basket']).then(() => {
                window.location.reload();
              });
            } else {
              this.router.navigate(['/homepage']).then(()=>{
                window.location.reload();
              });
            }
          }
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/homepage']);
  }

  public signUp(signUpRequest: SignUpRequest): Observable<string> {
    return this.http.post<string>(`${this.authUrl}/signup`, signUpRequest, {
      responseType: 'text' as 'json',
    }) as Observable<string>; //because the back retrun a text and here, we expect a json type
  }
}
