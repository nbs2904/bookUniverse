import { Router } from "@angular/router";
import { UserService } from "./../../services/user.service";
import { User } from "../../interfaces/user";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

import { PaymentMethod } from "../../interfaces/paymentMethod";
import { SubModel } from "../../interfaces/subModel";
import { PaymentMethodService } from "src/app/services/paymentMethod.service";
import { SubModelService } from "src/app/services/subModel.service";

@Component({
    selector: "app-signup",
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.scss"]
})

export class SignupComponent implements OnInit {
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
    
    paymentMethods : PaymentMethod[] = [];
    subModels : SubModel[] = [];


    constructor(private http: HttpClient, private router: Router, private userService: UserService, private paymentMethodService: PaymentMethodService, private subModelService: SubModelService) {
        this.subModelService.getSubModels().subscribe(
            (res) => {
                this.subModels = res;
            },
            (err) => {
                console.error("Something went wrong:", err);
                return;
            }
        );

        this.paymentMethodService.getPaymentMethods().subscribe(
            (res) => {
                this.paymentMethods = res;
            },
            (err) => {
                console.error("Something went wrong:", err);
                return;                
            }
        );
    }
    
    async signup(){
        if(this.user.pswd == this.user.pswdRepeat) {
            (await this.userService.createUser(this.user)).subscribe(
                (res: User) => {
                    this.user = res;
                    
                    localStorage.setItem("userId", this.user._id);
                    localStorage.setItem("isAuthenticated", "true");

                    this.router.navigateByUrl("/library");
                },
                (err: any) => {
                    console.error(err);
                }
            );
        }
    }

    ngOnInit() {
    }

}
