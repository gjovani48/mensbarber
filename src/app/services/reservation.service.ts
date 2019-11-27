import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Reservation } from '../models/reservation'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  //private url:string = "http://localhost:80"
  
  private url:string = "https://menbarbers.herokuapp.com"
  
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
    return this.http.put<any>(
      this.url + "/reservation/"+ reservation._id,
      reservation,
      { headers: this.headers }
    )
  }

  getUserReservations(id): Observable<any>{
    return this.http.get<any>(
      this.url + "/reservation/userreservations/" + id
    )
  }

  addCountToStyle(reservation): Observable<any>{
    return this.http.put<any>(
      this.url + "/reservation/incToSTyle/"+ reservation.style_id,
      reservation,
      { headers: this.headers }
    )
  }

  getReservationDate(date): Observable<Reservation[]>{
		return this.http.get<Reservation[]>(
      this.url + "/reservation/getdate/" + date
		)
  }


  getCompletedReservations(): Observable<Reservation[]>{
		return this.http.get<Reservation[]>(
			this.url + '/reservation/completedreservation'
		)
  }

  getStylesStats(id):Observable<Reservation[]>{
    return this.http.get<Reservation[]>(
      this.url + '/reservation/stylecount/' + id
    )
  }

  getReservationsToday(): Observable<Reservation[]>{
		return this.http.get<Reservation[]>(
			this.url + "/reservation/reservationstoday"
		)
  }

}
