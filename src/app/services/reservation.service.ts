import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Reservation } from '../models/reservation'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private url:string = "http://localhost:80"
  private headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private http: HttpClient) { }

  getReservations(): Observable<Reservation[]>{
		return this.http.get<Reservation[]>(
			this.url + "/reservation"
		)
  }

  getReservation(id): Observable<Reservation[]>{
		return this.http.get<Reservation[]>(
			this.url + "/reservation/" + id
		)
  }

  deleteReservation(id): Observable<Reservation[]>{
		return this.http.delete<Reservation[]>(
			this.url + "/reservation/" + id
		)
  }

  addReservation(reservation): Observable<any>{
    return this.http.post<any>(
			this.url + "/reservation",
			reservation,
			{ headers:this.headers }
		)
  }

  updateReservation(reservation): Observable<any>{
    console.log(reservation)
    return this.http.put<any>(
      this.url + "/reservation/"+ reservation._id,
      reservation,
      { headers: this.headers }
    )
  }
}