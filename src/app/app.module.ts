import { ReaderComponent } from "./components/reader/reader.component";
import { LibraryInfoComponent } from "./components/libraryInfo/libraryInfo.component";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { RootComponent } from "./components/root/root.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ImprintComponent } from "./components/imprint/imprint.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { LibraryComponent } from "./components/library/library.component";
import { CatalogueComponent } from "./components/catalogue/catalogue.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { HeaderComponent } from "./components/header/header.component";
import { BookInfoComponent } from "./components/bookInfo/bookInfo.component";


import { AppRoutingModule } from "./app-routing.module";

import { AuthGuard } from "./guards/auth.guard";

@NgModule({
    declarations: [											
        AppComponent,
        RootComponent,
        NavbarComponent,
        ImprintComponent,
        ProfileComponent,
        LibraryComponent,
        LibraryInfoComponent,
        CatalogueComponent,
        LoginComponent,
        SignupComponent,
        HeaderComponent,
        CatalogueComponent,
        BookInfoComponent,
        ReaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
    ],
    providers: [
        AuthGuard
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
