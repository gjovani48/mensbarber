import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { StylesComponent } from './styles/styles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { AccountComponent } from './account/account.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserGuard } from './user.guard';

const routes: Routes = [
	{
		path: "",
		redirectTo: "/home",
		pathMatch: "full"
	},

	{
		path: "home",
		component: HomeComponent
  },

  {
		path: 'dashboard',
    component: DashboardComponent,
    canActivate: [UserGuard]
	},

	{
		path: "styles",
    component: StylesComponent,
	},

	{
		path: "reservations",
    component: ReservationsComponent,
    canActivate: [UserGuard]
	},

	{
		path: "users",
    component: UsersComponent,
    canActivate: [UserGuard]
	},

	{
		path: "account",
    component: AccountComponent,
    canActivate: [UserGuard]
	},

	{
		path: "*",
		component: PagenotfoundComponent
	},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
