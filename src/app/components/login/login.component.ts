import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { User } from "../../interfaces/user";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    user: User = {
        _id:  "",
        name: "",
        userName: "",
        email: "",
        pswd: "",
        pswdRepeat: "",
        dateOfBirth: "",
        paymentMethodId: "",
        subModelId: "",
        country: "",        
    };

    constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

    login() {
        this.userService.getUser(this.user).subscribe(
            (res) => {
                this.user = res;
                
                localStorage.setItem("userId", this.user._id);
                localStorage.setItem("isAuthenticated", "true");

                this.router.navigateByUrl("/library");
            },
            (err) => {
                this.user.pswd = "";
                console.error(err);
            });
    }

    ngOnInit() {
    }

}
