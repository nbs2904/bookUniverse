import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RootComponent } from "./root/root.component";

@NgModule({
    declarations: [
        AppComponent,
        RootComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
