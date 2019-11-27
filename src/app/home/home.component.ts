import { Component, OnInit } from '@angular/core'
import { Style } from '../models/style'
import { User } from '../models/user'
import { StyleService } from '../services/style.service'
import { Reservation } from '../models/reservation'
import { ReservationService } from '../services/reservation.service'
import { UserService } from '../services/user.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  private bookingdate
  private bookingtime

  private user = new User()

  private styles: Style[]
  private trendingstyles: Style[]


  public reservationTime = [];

  private style = new Style()

  constructor(
    private styleService: StyleService,
    private reservationService: ReservationService,
    private userService: UserService,
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

  submitBooking(){
    const reservation = new Reservation()
    this.bookingdate = this.bookingdate + ", " + this.bookingtime
    reservation.reservation_date = this.bookingdate

    var id = localStorage.getItem('token');

    reservation.client_id =  id.slice(0,24)
    reservation.style_id = this.style._id
    reservation.total = this.style.price
    reservation.status = "Reserved"
    this.reservationService.addReservation(reservation).subscribe((response) => {
      if(response.msg == 'success'){
          this.reservationService.addCountToStyle(reservation).subscribe((response)=>{
        })
      }

    })
  }

  getReservationDate(){
    this.bookingdate = this.bookingdate;
    this.reservationService.getReservationDate(this.bookingdate).subscribe((response) => {
        this.reservationTime = response;
    })
  }
}
