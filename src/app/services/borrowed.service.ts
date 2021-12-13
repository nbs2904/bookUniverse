import { Borrowed } from "./../interfaces/borrowed";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class BorrowedService {

    constructor(private http: HttpClient) { }

    getBorrowedBooks(): Observable<Borrowed[]>{
        const userId = localStorage.getItem("userId");
        return this.http.get<Borrowed[]>(`api/borrowed/${userId}`);
    }

    getBorrowedBookIds(): Observable<any[]>{
        const userId = localStorage.getItem("userId");

        return this.http.get<any[]>(`api/borrowed/borrowedBookIds/${userId}`);
    }

    getBorrowedBookInfo(bookId: string): Observable<Borrowed>{
        const userId = localStorage.getItem("userId");
        

        return this.http.get<Borrowed>(`api/borrowed/borrowdBookInfo/${userId}/${bookId}`);
    }

    getBorrowedBookInfoByEntryId(id: string): Observable<Borrowed>{
        return this.http.get<Borrowed>(`api/borrowed/borrowdBookInfo/${id}`);
    }

    updateBorrowedEntry(entryId: string, newEndDate: Date): Observable<Borrowed>{
        return this.http.put<Borrowed>(`api/borrowed/${entryId}`, {id: entryId, endDate: newEndDate});
    }

    updateProgress(entryId: string, progress: any): Observable<Borrowed>{
        return this.http.put<Borrowed>(`api/borrowed/${entryId}`, {id: entryId, progress: progress});
    }
}
