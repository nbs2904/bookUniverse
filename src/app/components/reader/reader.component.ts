import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Borrowed } from "src/app/interfaces/borrowed";
import { BorrowedService } from "src/app/services/borrowed.service";

@Component({
    selector: "app-reader",
    templateUrl: "./reader.component.html",
    styleUrls: ["./reader.component.scss"]
})
export class ReaderComponent implements OnInit, OnDestroy {
    setUrlScriptElement: HTMLScriptElement | undefined;
    epubScriptElement: HTMLScriptElement | undefined;
    ajaxScriptElement: HTMLScriptElement | undefined;
    loadEpubScriptElement: HTMLScriptElement | undefined;

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
        // TODO upate backend model files
        this.route.params.subscribe((params) => {
            this.borrowedEntry._id = params["borrowedId"];

            this.borrowedService.getBorrowedBookInfoByEntryId(this.borrowedEntry._id).subscribe(
                (res) => {
                    this.borrowedEntry = res;

                    localStorage.setItem("bookTitle", this.borrowedEntry.book.title);
                    if(!localStorage.getItem("currentPosition")) localStorage.setItem("currentPosition", JSON.stringify(this.borrowedEntry.progress));
                    
                    this.epubScriptElement = document.createElement("script");
                    this.epubScriptElement.src = "/assets/js/epub.min.js";
                    document.head.appendChild(this.epubScriptElement);

                    this.ajaxScriptElement = document.createElement("script");
                    this.ajaxScriptElement.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js";
                    document.head.appendChild(this.ajaxScriptElement);
                    
                    this.loadEpubScriptElement = document.createElement("script");
                    this.loadEpubScriptElement.src = "/assets/js/loadEpub.js";
                    document.body.appendChild(this.loadEpubScriptElement);

                },
                (err) => {
                    console.error(err);
                    this.router.navigateByUrl("/library");
                    
                }
            );
        });
    }

    
    ngOnDestroy(): void {
        this.borrowedService.updateProgress(this.borrowedEntry._id, JSON.parse(localStorage.getItem("currentPosition") || "")).subscribe();
        localStorage.removeItem("currentPosition");
    }
}

