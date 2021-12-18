import { HttpClient } from "@angular/common/http";
import { User } from "../interfaces/user";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Md5 } from "ts-md5";
import * as EmailValidator from "email-validator";

@Injectable({
    providedIn: "root"
})
export class UserService {

    constructor(private http: HttpClient) { }

    async createUser(user: User): Promise<Observable<User>>{        
        if(!user.name || !user.userName || !user.email || !user.dateOfBirth || !user.pswd || !user.pswdRepeat || !user.paymentMethodId || !user.subModelId || !user.country){
            console.error("All fields must be filled.");
            alert("All fields must be filled.");
            throw throwError("All fields must be filled.");
        } else if(user.pswd != user.pswdRepeat){
            console.error("Both password fields must be equal.");
            alert("Both password fields must be equal.");
            throw throwError("Both password fields must be equal.");
        } else if(user.pswd.length < 10) {            
            alert("Password must contain at least 10 characters.");
            throw throwError("Password must contain at least 10 characters.");
        } else if(!EmailValidator.validate(user.email)){
            alert("Email has to be valid.");
            console.error("Email is invalid");
            throw throwError("Email is invalid.");            
        } else {

            let userExists = true;

            await this.http.get<boolean>(`api/user/email/${user.email}`).toPromise()
                .then(() => {
                    userExists = true;
                })
                .catch((err) => {
                    console.error(err);                    
                    userExists = false;
                });

            if(!userExists) {
                user.pswd = Md5.hashStr(user.pswd);
                delete user.pswdRepeat;
                
                return this.http.post<User>("api/user", user);
            } else {
                alert("User already exists. Please use a different email.");
                console.error("User already exists. Please use a different email.");
                throw throwError("User already exists. Please use a different email.");                   
            }

        }
    }

    getUser(user: User): Observable<User> {

        if(!user.email || !user.pswd){
            alert("Fields must not be empty.");
            throw throwError("Fields must not be empty.");
        } else {
            const hash = Md5.hashStr(user.pswd);
            
            user.dateOfBirth = user.dateOfBirth.substring(0, user.dateOfBirth.indexOf("T"));
            user.pswd = "";

            return this.http.get<User>(`api/user/${user.email}/${hash}`);
        }
    }

    getUserById(userId: string): Observable<User> {
        return this.http.get<User>(`api/user/${userId}`);
    }

    updateUser(user: User): Observable<User> {     
        if(!user.name || !user.userName || !user.email || !user.dateOfBirth || !user.pswd || !user.pswdRepeat || !user.paymentMethodId || !user.subModelId || !user.country){
            console.error("All fields must be filled.");
            alert("All fields must be filled.");
            throw throwError("All fields must be filled.");
        } else if(user.pswd != user.pswdRepeat){
            console.error("Both password fields must be equal.");
            alert("Both password fields must be equal.");
            throw throwError("Both password fields must be equal.");
        } else if(user.pswd.length < 10) {            
            alert("Password must contain at least 10 characters.");
            throw throwError("Password must contain at least 10 characters.");
        } else if(!EmailValidator.validate(user.email)){
            alert("Email has to be valid.");
            console.error("Email is invalid");
            throw throwError("Email is invalid.");            
        } else {
            const userId = localStorage.getItem("userId");

            // eslint-disable-next-line prefer-const
            let newUser = Object.assign({}, user);

            newUser.pswd = Md5.hashStr(newUser.pswd);
            delete newUser.pswdRepeat;            

            user.pswd = "";
            user.pswdRepeat = "";

            const response: any = this.http.put<User>(`api/user/${userId}`, newUser);

            return response;

        }
    }
}
