import { Component } from '@angular/core';
import { UserService } from './services/user.service'
import { User } from './models/user'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = "Men's Barber"

  // login
  private userEmail: String
  private userPassword: String
  public user = new User()

  // registration
  private createAccount = false
  private newuser: User[]
  private registerFirstname
  private registerMiddlename
  private registerLastname
  private registerPhone
  private registerEmail
  private registerPassword
  private verifyregpassword

  private loggedIn = false

  constructor(
    private userService: UserService
    ) { }

  ngOnInit(){
    if(localStorage.getItem('token')){
      this.loggedIn = true
      var id = localStorage.getItem('token');
      this.userService.viewUser(id.slice(0,24)).subscribe((response) =>{
        this.user = response[0];
      })  
    }
  }

  addUser(){
    const newuser = new User()
    newuser.firstname = this.registerFirstname
    newuser.middlename = this.registerMiddlename
    newuser.lastname = this.registerLastname
    newuser.phone = this.registerPhone
    newuser.email = this.registerEmail
    newuser.password = this.registerPassword
    this.userService.addUser(newuser).subscribe((data)=>{
      if(data.msg == "success"){
        alert("Registration Successful")
      }
    })

  }

  login(){
    this.user = new User()
    this.user.email = this.userEmail
    this.user.password = this.userPassword
    this.userService.login(this.user).subscribe((response) => {
      if(response.msg == "success"){
        localStorage.setItem('token',response.user._id+"."+response.token)
        var id = localStorage.getItem('token');
        this.viewUser(id.slice(0,24));

        if(!!localStorage.getItem('token')){
          this.loggedIn = true
          alert("Login Success");
          window.location.href = "/"
        }

      }
      else{
        alert("Login failed")
      }

    })
  }

  viewUser(id){
    this.userService.viewUser(id).subscribe((response) =>{
      this.user = response[0];
    })
  }

  logOut(){
    if(confirm("Are you sure to logout?")){
      alert("Logged out");
      window.location.href = "/"
      localStorage.removeItem("token")
    } 
  }
}