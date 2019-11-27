import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md'
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core'
import { Style } from '../models/style'
import { StyleService } from '../services/style.service'
import { Reservation } from '../models/reservation'
import { ReservationService } from '../services/reservation.service'
import { UserService } from '../services/user.service'
import { User } from '../models/user'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent
	@ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  private users: any = []
  private styles: any = []
  private previous: any = []
  private reservations: any = []
  private todaysreservations: any = []
  private completedreservations: any = []

  private user = new User()

  private reservation

	private reservationClient
	private reservationStyle: any = []

  constructor(
    private cdRef: ChangeDetectorRef,
    private styleService: StyleService,
    private reservationService: ReservationService,
    private userService:UserService
    ) {}

  ngOnInit() {
    this.getUsers()
    this.getStylesCount()
    this.getReservations()
    this.getCompletedReservation()
    this.getReservationsToday()
    this.reservation = new Reservation()
		this.reservationClient = new User()
    this.reservationStyle = new Style()

    if(!!localStorage.getItem('token')){

      var id = localStorage.getItem('token');

       this.viewUser(id.slice(0,24));

    }

  }

  ngAfterViewInit() {
		this.mdbTablePagination.setMaxVisibleItemsNumberTo(5)
		this.mdbTablePagination.calculateFirstItemIndex()
		this.mdbTablePagination.calculateLastItemIndex()
		this.cdRef.detectChanges()
	}

  getStylesCount(){
    this.styleService.getStyles().subscribe((response) => {
      this.styles = response
    })

  }

  getReservation(id){
		this.reservationService.getReservation(id).subscribe((response)=> {
			this.reservation = response[0]
			this.reservationClient = response[0].client_id
			this.reservationStyle = response[0].style_id
		})
	}

  getReservations(){
    this.reservationService.getReservations().subscribe((response)=>{
        this.reservations = response
        this.mdbTable.setDataSource(this.reservations)
        this.reservations = this.mdbTable.getDataSource()
        this.previous = this.mdbTable.getDataSource()
    })

}

startHaircut(){
		const reservation = new Reservation()
		reservation._id = this.reservation._id
		reservation.reservation_date = this.reservation.reservation_date
		reservation.total = this.reservation.total
		reservation.status = "Serving"
		reservation.client_id = this.reservationClient._id
		reservation.style_id = this.reservationStyle._id
		this.reservationService.updateReservation(reservation).subscribe((response) => {
			this.getReservationsToday()
		})
}

completeHaircut(){
  const reservation = new Reservation()
		reservation._id = this.reservation._id
		reservation.reservation_date = this.reservation.reservation_date
		reservation.total = this.reservation.total
		reservation.status = "Completed"
		reservation.client_id = this.reservationClient._id
		reservation.style_id = this.reservationStyle._id
		this.reservationService.updateReservation(reservation).subscribe((response) => {
      this.getReservationsToday()
      this.getCompletedReservation()
		})
}

getReservationsToday(){
  this.reservationService.getReservationsToday().subscribe((response)=>{
      this.todaysreservations = response
      this.mdbTable.setDataSource(this.todaysreservations)
      this.todaysreservations = this.mdbTable.getDataSource()
      this.previous = this.mdbTable.getDataSource()
  })
}

  getUsers(){
    this.userService.getUsers().subscribe((response)=>{
        this.users = response
    })
  }

  getCompletedReservation(){
      this.reservationService.getCompletedReservations().subscribe((response)=>{
          this.completedreservations = response
      })

  }

  viewUser(id){
    this.userService.viewUser(id).subscribe((response) => {
      this.user = response[0]

      if(this.user.role=="client"){
        window.location.href="/home";
      }

    })
  }

}
