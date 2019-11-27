import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { MDBBootstrapModule } from 'angular-bootstrap-md'
import { HomeComponent } from './home/home.component'
import { StylesComponent } from './styles/styles.component'
import { ReservationsComponent } from './reservations/reservations.component'
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component'
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account/account.component'
import { UserService } from './services/user.service';
import { UserGuard } from './user.guard'
import { StyleService } from './services/style.service'




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StylesComponent,
    ReservationsComponent,
    PagenotfoundComponent,
    UsersComponent,
    DashboardComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [UserService, UserGuard,StyleService],
  bootstrap: [AppComponent],
})
export class AppModule { }
