import { NgModule } from '@angular/core';
//Modulos
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CheckOutComponent } from './pages/check-out/check-out.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { CardComponent } from './shared/card/card.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
//Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    CheckOutComponent,
    NavBarComponent,
    CardComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
