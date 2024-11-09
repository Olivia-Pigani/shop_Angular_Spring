import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, effect, inject, signal } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Customer } from './customer';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpErrorService } from '../utils/http-error.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
private customerBaseUrl:string = `http://localhost:8586/api/v1/customers`
private httpErrorService:HttpErrorService = inject(HttpErrorService);
private jwtHelper: JwtHelperService = inject(JwtHelperService);
private http: HttpClient = inject(HttpClient);


public customerDetails$: Observable<Customer> = this.http.get<Customer>(`${this.customerBaseUrl}/${this.customerId}`,{headers: this.header})
.pipe(
  tap(customer => console.log(customer)),
  catchError(err=>
    this.handleError(err))
);

public updateCustomerById(updatedCustomerData: Customer):Observable<Customer>{
  return this.http.put<Customer>(`${this.customerBaseUrl}/${this.customerId}`,updatedCustomerData, {headers: this.header});
}


private get customerId(): string | null {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.userId ?? null;
  }
  return null;
}

private handleError(err: HttpErrorResponse):Observable<never>{
  const formattedMsg = this.httpErrorService.formatError(err);
  return throwError(()=>formattedMsg); 
  }

private get header(): HttpHeaders{
 const token:string | null= localStorage.getItem("token"); 
 return new HttpHeaders({
  'Authorization': 'Bearer '+ token
 })
}
  
}
