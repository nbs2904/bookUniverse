import { Borrowed } from "./../../interfaces/borrowed";
import { BorrowedService } from "./../../services/borrowed.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-library",
    templateUrl: "./library.component.html",
    styleUrls: ["./library.component.scss"]
})
export class LibraryComponent implements OnInit {

    borrowedBooks: Borrowed[] = [];
    gotResponse = false;

    constructor(private router: Router, private borrowedService: BorrowedService) { }

    ngOnInit() {
        this.borrowedService.getBorrowedBooks().subscribe(
            (res) => {
                this.borrowedBooks = res;
                this.gotResponse = true;
                console.log(this.borrowedBooks);
                
            },
            (err) => {
                this.gotResponse = true;
                console.error(err);                
            }
        );
    }

}
