import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpErrorService } from '../utils/http-error.service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Address } from './address';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private http: HttpClient = inject(HttpClient);
  private addressUrl: string = 'http://localhost:8482/api/v1/addresses';
  private httpErrorService: HttpErrorService = inject(HttpErrorService);
  private jwtHelper: JwtHelperService = inject(JwtHelperService);
  public customerAddress: WritableSignal<Address> = signal({} as Address);

   constructor() {
     this.loadCustomerAddress();
   }
 
   private loadCustomerAddress(): void {
     this.http
       .get<Address>(`${this.addressUrl}/customers/${this.customerId}`, {
         headers: this.header,
       })
       .pipe(
         tap((address) => console.log('Adresse récupérée:', address)),
         catchError((err) => this.handleError(err))
       )
       .subscribe((data) => {
         this.customerAddress.set(data); 
       });
   }

  public updateAddressByCustomerId(
    updatedAddressData: Address
  ): Observable<Address> {
    return this.http.put<Address>(
      `${this.addressUrl}/customers/${this.customerId}`,
      updatedAddressData,
      { headers: this.header }
    ).pipe(
      tap((updatedAddress)=>{
        this.customerAddress.set(updatedAddress);
      })
    );
  }

  public saveAddressByCustomerId(addressData: Address): Observable<Address> {
    return this.http.post<Address>(
      `${this.addressUrl}/customers/${this.customerId}`,
      addressData,
      { headers: this.header }
    ).pipe(
      tap((newAddress) => {
        this.customerAddress.set(newAddress); 
      })
    );
  }

  private get customerId(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.userId ?? null;
    }
    return null;
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formattedMsg = this.httpErrorService.formatError(err);
    return throwError(() => formattedMsg);
  }

  private get header(): HttpHeaders {
    const token: string | null = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
  }
}
