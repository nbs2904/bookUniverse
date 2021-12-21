import { Borrowed } from "./../../interfaces/borrowed";
import { Router } from "@angular/router";
import { BorrowedService } from "./../../services/borrowed.service";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import dateFormat from "dateformat";

@Component({
    selector: "app-libraryInfo",
    templateUrl: "./libraryInfo.component.html",
    styleUrls: ["./libraryInfo.component.scss"]
})
export class LibraryInfoComponent implements OnInit {
    borrowedEntry: Borrowed = {
        _id: "",
        startDate: "",
        endDate: "",
        progress: "",
        book: {
            _id: "",
            title: "",
            pageCount: 0,
            ISBN13: "",
            coverUrl: "",
            authors: [],
            language: "",
            description: ""
        }
    };

    constructor(private route: ActivatedRoute, private borrowedService: BorrowedService, private router: Router) { }

    ngOnInit() {
        this.route.params.subscribe((params) => {
            this.borrowedEntry.book._id = params["bookId"];

            this.borrowedService.getBorrowedBookInfo(this.borrowedEntry.book._id).subscribe(
                (res) => {
                    this.borrowedEntry = res;

                    this.borrowedEntry.startDateFormatted = dateFormat(this.borrowedEntry.startDate, "dd.mm.yyyy");
                    this.borrowedEntry.endDateFormatted = dateFormat(this.borrowedEntry.endDate, "dd.mm.yyyy");
                    
                },
                (err) => {
                    console.error(err);
                    this.router.navigateByUrl("/library");
                }
            );
        });
    }

    extend(){
        const newEndDate = new Date(this.borrowedEntry.endDate);
        newEndDate.setDate(newEndDate.getDate() + 14);
        
        this.borrowedService.updateBorrowedEntry(this.borrowedEntry._id, newEndDate).subscribe(
            () => {
                alert("Duration was extended for 2 weeks.");

                this.borrowedEntry.endDate = dateFormat(newEndDate, "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'");
                this.borrowedEntry.endDateFormatted = dateFormat(newEndDate, "dd.mm.yyyy");
            },
            (err) => {
                console.error(err);
                this.router.navigateByUrl("/library");
            }
        );
    }

    returnBook(){
        const newEndDate = new Date();
        newEndDate.setDate(newEndDate.getDate() - 1);

        this.borrowedService.updateBorrowedEntry(this.borrowedEntry._id, newEndDate).subscribe(
            () => {
                alert("Book was returned.");
                this.router.navigateByUrl("/library");
            },
            (err) => {
                console.error(err);
                this.router.navigateByUrl("/library");                
            }
        );

    }

    readBook(){
        this.router.navigateByUrl(`/reader/${this.borrowedEntry._id}`);
    }

}
