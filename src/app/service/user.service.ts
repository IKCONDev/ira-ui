import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse} from "@angular/common/http";
import { UserModel } from '../model/UserModel';
import { catchError, Observable, of } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  
  export class UserService{
    private url="http://localhost:8021/user";
  baseUrl: any;
  email: string;
  userservice: any;
    constructor(private http:HttpClient){}


// Save User (used to register or save user details)
saveUser(user: UserModel) {
    return this.http.post<UserModel>(`${this.url}/saveUser`, user, { observe: 'response' });
  }

//userlogin
  loginUser(user: UserModel){
    return this.http.post<UserModel>(`${this.url}/login`, user, { observe: 'response' });
  }

  // Get all users
  getAllUsers() {
    return this.http.get<UserModel[]>(`${this.url}/getAllUsers`, { observe: 'response' });
  }

//  check if the email is valid
validateEmailId(email: string): Observable<any> {
  console.log(`Validating email: ${email}`);
  return this.http.get<any>(`${this.url}/forgotuser/${email}`, { observe: 'response' })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error in validateEmailId:', error);
        this.handleError(error);
        return of(null); // Return null in case of error
      })
    );
}
  handleError(error: HttpErrorResponse) {
    throw new Error("Method not implemented.");
  }

  // Call to request OTP
  requestOtp(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}/request-otp/${email}`, {});
  }

//  //generate otp..
//  generateOtp(email: string): Observable<any> {
//   console.log(`Generating OTP for email: ${email}`);
 
//   return this.http.post<any>(`${this.url}/request-otp/${email}`, {}, { observe: 'response' })
//     .pipe(
//       catchError((error: HttpErrorResponse) => {
//         console.error('Error in generateOtp:', error);
//         this.handleError(error);
//         return of(null); // Return null in case of error
//       })
//     );
// }


 
generateOtp(email: string): Observable<boolean> {
  return this.http.get<boolean>(`${this.url}/request-otp/${email}`);
}
//verify otp



verifyOtp(email: string, otp: string): Observable<boolean> {
  return this.http.post<boolean>(`${this.url}/verify-otp/${email}`, null, { params: { otp } });
}

  
 //reset password
  resetPassword(email: string, newPassword: string, confirmPassword: string): Observable<any> {
      if (newPassword !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    const params = new HttpParams()
      .set('email', email)
      .set('newPassword', newPassword)
      //.set('confirmPassword', confirmPassword); 
    return this.http.post<any>(`${this.url}/reset-password`, null, {
      params: params,
      observe: 'response'
    });
  }
}