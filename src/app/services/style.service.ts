import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Style } from '../models/style'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class StyleService {

  private url:string = "http://localhost:80"
  private headers = new HttpHeaders().set('Content-Type', 'application/json')

	constructor(
		private http: HttpClient
  ) { }

  getStyles(): Observable<Style[]>{
		return this.http.get<Style[]>(
			this.url + "/style"
		)
  }

  getTrendingStyles(): Observable<Style[]>{
	return this.http.get<Style[]>(
		this.url + "/style/trending"
	)
}

  getStyle(id): Observable<Style[]>{
	return this.http.get<Style[]>(
		this.url + "/style/"+id
	)
}
  
}
