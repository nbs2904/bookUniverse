import { HttpClient } from "@angular/common/http";
import { Book } from "./../../interfaces/book";
import { BookService } from "./../../services/book.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-bookInfo",
    templateUrl: "./bookInfo.component.html",
    styleUrls: ["./bookInfo.component.scss"]
})
export class BookInfoComponent implements OnInit {
    book: Book = {
        _id: "",
        title: "",
        subtitle: "",
        pageCount: 0,
        ISBN13: "",
        coverUrl: "",
        authors: [],
        language: "",
        description: ""
    };

    constructor(private route: ActivatedRoute, private bookService: BookService, private http: HttpClient, private router: Router) { }

    ngOnInit() {
        // oninit retrieve book infos by id
        this.route.params.subscribe((params) => {
            this.book._id = params["bookId"];

            this.bookService.getBookDetails(this.book._id).subscribe(
                (res) => {
                    this.book = res;                    
                },
                (err) => {
                    console.error(err);
                    this.router.navigateByUrl("/catalogue");
                }
            );
        });
    }

    // borrows book after user clicked "borrow" button
    borrowBook(){
        // ?  sets endDate two weeks after startDate
        const newEntry = {
            userId: localStorage.getItem("userId"),
            bookId: this.book._id,
            startDate: new Date(),
            endDate: new Date(Date.now() + 12096e5),
            progress: 0
        };    
        
        this.http.post<any>("api/borrowed", newEntry).toPromise()
            .then(() => {
                this.router.navigateByUrl("/library");
            
            })
            .catch((err) => {
                console.error(err);                
            });        
    }

}

