import { SubModelService } from "./../../services/subModel.service";
import { PaymentMethodService } from "./../../services/paymentMethod.service";
import { Router } from "@angular/router";
import { UserService } from "./../../services/user.service";
import { User } from "../../interfaces/user";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

import { PaymentMethod } from "../../interfaces/paymentMethod";
import { SubModel } from "../../interfaces/subModel";

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.scss"]
})

export class ProfileComponent implements OnInit {
    user: User = {
        _id:  localStorage.getItem("userId") || "",
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

    ngOnInit() {
        this.userService.getUserById(this.user._id).subscribe(
            (res) => {
                this.user = res;
                this.user.pswdRepeat = "";             
                this.user.dateOfBirth = this.user.dateOfBirth.substring(0, this.user.dateOfBirth.indexOf("T"));
            },
            (err) => {
                console.error(err);                
            }
        );
    }

    logout(){
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userId");

        this.router.navigateByUrl("/login");
    }
    
    updateUser(){
        if(this.user.pswd == this.user.pswdRepeat) {
            ((this.userService.updateUser(this.user))).subscribe(
                () => {
                    alert("Profile was successfully updated.");
                },
                (err) => {
                    console.error(err);
                }
            );
        } else {
            alert("Both passwords must be equal.");
        }
    }

}
