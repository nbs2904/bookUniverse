import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Book } from "../interfaces/book";

@Injectable({
    providedIn: "root"
})
export class BookService {

    constructor(private http: HttpClient) { }

    getBooks(): Observable<Book[]>{        
        return this.http.get<Book[]>("api/book");
    }

    getBookDetails(bookId: string): Observable<Book>{
        return this.http.get<Book>(`api/book/${bookId}`);
    }
}
