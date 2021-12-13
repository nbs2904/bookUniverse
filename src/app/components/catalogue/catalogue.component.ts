import { BookService } from "./../../services/book.service";
import { BorrowedService } from "src/app/services/borrowed.service";
import { Book } from "./../../interfaces/book";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-catalogue",
    templateUrl: "./catalogue.component.html",
    styleUrls: ["./catalogue.component.scss"]
})
export class CatalogueComponent implements OnInit {

    books: Book[] = [];
    borrowedBookIds: string[] = [];
    gotResponse = false;

    constructor(private router: Router, private bookService: BookService, private borrowedService: BorrowedService) { }
    // TODO entferne unnötiges logging
    ngOnInit() {
        this.bookService.getBooks().subscribe(
            (res) => {
                this.books = res;
                console.log(this.books);

                this.borrowedService.getBorrowedBookIds().subscribe(
                    (res) => {
                        this.borrowedBookIds = res;

                        this.books = this.books.filter((element) => {
                            return !this.borrowedBookIds.includes(element._id);
                        });
                        
                        this.gotResponse = true;
                        console.log(this.books);
                        
                        
                    },
                    (err) => {
                        console.error(err);
                    }
                );
                
            },
            (err) => {
                console.error(err);                
            }
        );
    }

    getBooks(){
        
    }

}
