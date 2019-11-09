import { Component } from '@angular/core';
import { ClientService } from './services/client.service'
import { Client } from './models/client'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = "Men's Barber"

  private clients: Client[]

  // login
  private userEmail: String
  private userPassword: String
  private client

  // registration
  private createAccount = false
  private newclient: Client[]
  private registerFirstname
  private registerMiddlename
  private registerLastname
  private registerPhone
  private registerEmail
  private registerPassword
  private verifyregpassword

  private loggedIn = false

  constructor(
    private clientService: ClientService,
    private router: Router
    ) { }
 
  addClient(){

    const newclient = new Client()
    newclient.firstname = this.registerFirstname
    newclient.middlename = this.registerMiddlename
    newclient.lastname = this.registerLastname
    newclient.phone = this.registerPhone
    newclient.email = this.registerEmail
    newclient.password = this.registerPassword

    this.clientService.addClient(newclient).subscribe((data)=>{
        console.log(data)
        alert("registration success!")
 
    })

  }

  login(){
    this.client = new Client()
    this.client.email = this.userEmail
    this.client.password = this.userPassword
    this.clientService.login(this.client).subscribe((response) => {
      this.client = response.client
      this.clientService.setClient(this.client)
      this.loggedIn = true
      alert("Log in Successful")
    })
  }

  getClients(){
    this.clientService.getClients().subscribe((response) => {
      this.clients = response
    })
  }

  navigateHome(client_id){
    this.router.navigate(['/home', client_id])
  }

  navigateStyle(client_id){
    this.router.navigate(['/styles', client_id])
  }

  navigateReservation(client_id){
    this.router.navigate(['/reservations', client_id])
  }

}