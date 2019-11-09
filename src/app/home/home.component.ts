import { Component, OnInit } from '@angular/core'
import { Style } from '../models/style'
import { StyleService } from '../services/style.service'
import { Reservation } from '../models/reservation'
import { ReservationService } from '../services/reservation.service'
import { ClientService } from '../services/client.service'
import { Client } from '../models/client'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  private bookingdate
  private bookingtime

  private client

  private styles: Style[]
  private trendingstyles: Style[]

  private style = new Style()
  
  constructor(
    private styleService: StyleService,
    private reservationService: ReservationService,
    private clientService: ClientService,
  ) { }

  ngOnInit() {
    this.getStyles()
    this.getTrendingStyles()
  }

  getStyles(){
    this.styleService.getStyles().subscribe((response) => {
      this.styles = response
    })
  }

  getTrendingStyles(){
    this.styleService.getTrendingStyles().subscribe((response) => {
      this.trendingstyles = response
    })
  }

  getStyle(id){
    this.styleService.getStyle(id).subscribe((response) => {
      this.style._id = response[0]._id
      this.style.name = response[0].name
      this.style.description = response[0].description
      this.style.price = response[0].price
      this.style.image = response[0].image
    })
  }

  test(){
    alert("change date")
  }

  submitBooking(){
    const reservation = new Reservation()
    this.bookingdate = this.bookingdate + ", " + this.bookingtime
    reservation.reservation_date = this.bookingdate
    this.client = this.clientService.getClient()
    reservation.client_id =  this.client._id
    reservation.style_id = this.style._id
    reservation.total = this.style.price
    reservation.payment_status = "Paid"
    this.reservationService.addReservation(reservation).subscribe((response) => {
      alert("Booking Successful")
    })
  }
}