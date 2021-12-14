import { ImprintComponent } from "./components/imprint/imprint.component";
import { ReaderComponent } from "./components/reader/reader.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LibraryComponent } from "./components/library/library.component";
import { CatalogueComponent } from "./components/catalogue/catalogue.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { BookInfoComponent } from "./components/bookInfo/bookInfo.component";
import { LibraryInfoComponent } from "./components/libraryInfo/libraryInfo.component";

import { AuthGuard } from "./guards/auth.guard";


const routes: Routes = [
    { path: "library/:bookId", component: LibraryInfoComponent, canActivate: [AuthGuard] },
    { path: "library", component: LibraryComponent, canActivate: [AuthGuard] },
    { path: "catalogue/:bookId", component: BookInfoComponent, canActivate: [AuthGuard] },
    { path: "catalogue", component: CatalogueComponent, canActivate: [AuthGuard] },
    { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
    { path: "reader/:borrowedId", component: ReaderComponent, canActivate: [AuthGuard] },
    { path: "imprint", component: ImprintComponent },
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "**", redirectTo: "library", pathMatch: "full" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
