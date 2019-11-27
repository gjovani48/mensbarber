import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { User } from '../models/user'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private url:string = "http://localhost:80"
  private url: string =  'https://menbarbers.herokuapp.com';
  
  private headers = new HttpHeaders().set('Content-Type', 'application/json')

  public user

  constructor(private http: HttpClient) { }



  addUser(user): Observable <any>{
    return this.http.post<any>(
      this.url + "/user",
      user,
      {headers:this.headers}
    )
  }

  login(user): Observable <any>{
    return this.http.post<any>(
      this.url + "/user/login",
      user,
      {headers: this.headers}
    )
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  setUser(user){
    this.user = new User()
    this.user._id = user._id
    this.user.firstname = user.firstname
    this.user.middlename = user.middlename
    this.user.lastname = user.lastname
    this.user.phone = user.phone
    this.user.email = user.email
    this.user.role = user.role
  }

  getUser(){
    return this.user
  }

  getUsers(): Observable <any>{
    return this.http.get<any>(
      this.url+"/user",
    )
  }

  // Admin functions for user management

  viewUser(id): Observable <User[]>{
		return this.http.get<User[]>(
			this.url + "/user/" + id
		)
  }

  updateUser(user): Observable <any>{
    return this.http.put<any>(
      this.url + "/user/" + user._id,
      user,
      {headers: this.headers}
    )
  }



  deleteUser(id){
    return this.http.delete<any>(
      this.url + "/user/" + id
    )
  }


}
