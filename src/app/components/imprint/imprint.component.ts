import { Component, OnInit } from "@angular/core";

// TODO imprint on hover icons darstellen

@Component({
    selector: "app-imprint",
    templateUrl: "./imprint.component.html",
    styleUrls: ["./imprint.component.scss"]
})
export class ImprintComponent implements OnInit {
    imprintOpen = false;

    toggleImprint(){
        this.imprintOpen = !this.imprintOpen;
    }

    constructor() { }

    ngOnInit() { }

}
