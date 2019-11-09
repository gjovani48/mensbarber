import { Component, OnInit } from '@angular/core'
import { Client } from '../models/client'
import { ClientService } from '../services/client.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private clients: Client[]

  // login
  private userEmail: String
  private userPassword: String
  private matchFound: boolean
  private client

  public tempName:String;

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

  constructor(private clientService: ClientService) { }

  ngOnInit() {
  }

  


}
