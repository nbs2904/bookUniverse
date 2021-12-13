import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SubModel } from "../interfaces/subModel";

@Injectable({
    providedIn: "root"
})
export class SubModelService {

    constructor(private http: HttpClient) { }

    getSubModels(): Observable<SubModel[]>{
        return this.http.get<SubModel[]>("api/subModel");
    }
}
