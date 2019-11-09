import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Client } from '../models/client'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url:string = "http://localhost:80"
  private headers = new HttpHeaders().set('Content-Type', 'application/json')

  public client

  constructor(private http: HttpClient) { }

  login(client): Observable <any>{
   
    return this.http.post<any>(
      this.url + "/client/login",
      client,
      {headers: this.headers}
    )
  }

  setClient(client){
    this.client = new Client()
    this.client._id = client._id
    this.client.firstname = client.firstname
    this.client.middlename = client.middlename
    this.client.lastname = client.lastname
    this.client.email = client.email
  }

  getClient(){
    return this.client
  }

  getClients(): Observable <any>{
    return this.http.get<any>(
      this.url+"/client",
    )
  }

  addClient(client): Observable <any>{

    return this.http.post<any>(
      this.url + "/client",
      client,
      {headers:this.headers}
    )
    
  }
}