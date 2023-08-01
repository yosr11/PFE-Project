import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('http://localhost:3000/forgotpassword',  { email: email });
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string ,confirmPassword:string, id_client:number): Observable<any>
    {
        return this._httpClient.post(`http://localhost:3000/reset-password/${id_client}`, {password:password ,confirmPassword:confirmPassword });
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string;}): Observable<any>
    {
    
        return this._httpClient.post(`http://localhost:3000/client/login`, credentials).pipe(
            switchMap((response: any) => {
    
                // Set the authenticated flag to true
                this._authenticated = true;
    
                // Store the user on the user service
                this._userService.user = response.user;
    
                // Return a new observable with the response
                return of(response);
            })
            
        );
        
    }
    

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('accessToken');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    /*signUp(user: { name: string; prenom: string;  email: string; password: string; confirmPassword :string; address:string; zipCode:number; phoneNumber:string}): Observable<any>
    {
        return this._httpClient.post('http://localhost:3000/client/inscription', user);
    }*/

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
       //return this.signInUsingToken();
    }
}
