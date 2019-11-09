import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StylesComponent } from './styles/styles.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

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
		path: "styles",
		component: StylesComponent
	},

	{
		path: "reservations",
		component: ReservationsComponent
	},

	{
		path: "**",
		component: PagenotfoundComponent
	},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
