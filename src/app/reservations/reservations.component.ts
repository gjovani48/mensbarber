import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md'
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core'
import { Reservation } from '../models/reservation'
import { Style } from '../models/style'
import { ReservationService } from '../services/reservation.service'
import { StyleService } from '../services/style.service'
import { User } from '../models/user'
import { UserService } from '../services/user.service'

@Component({
	selector: 'app-reservations',
	templateUrl: './reservations.component.html',
	styleUrls: ['./reservations.component.scss']
})

export class ReservationsComponent implements OnInit, AfterViewInit {

	@ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent
	@ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
	private reservations: any = []
	private previous: any = []
	private headElements = ['Client', 'Style', 'Date', 'Time', 'Status']
	private searchText: string = ''

	private reservation

	private reservationClient
	private reservationStyle: any = []

  private styles: any = []
  private user = new User()

	private editStyle: String

	private newbookingdate
	private newbookingtime

	constructor(private cdRef: ChangeDetectorRef, private reservationService: ReservationService, private styleService: StyleService, private userService: UserService) {}

	@HostListener('input') oninput() {
		this.searchItems()
	}

	ngOnInit() {
		this.getReservations()
		this.reservation = new Reservation()
		this.reservationClient = new User()
		this.reservationStyle = new Style()
		this.styleService.getStyles().subscribe((response) => {
			this.styles = response
    })

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

	searchItems() {
		const prev = this.mdbTable.getDataSource()

		if (!this.searchText) {
			this.mdbTable.setDataSource(this.previous)
			this.reservations = this.mdbTable.getDataSource()
		}

		if (this.searchText) {
			this.reservations = this.mdbTable.searchLocalDataBy(this.searchText)
			this.mdbTable.setDataSource(prev)
		}
	}

	getReservation(id){
		this.reservationService.getReservation(id).subscribe((response)=> {
			this.reservation = response[0]
			this.reservationClient = response[0].client_id
			this.reservationStyle = response[0].style_id
		})
	}

	getReservations(){
		this.reservationService.getReservations().subscribe((response) => {
			this.reservations = response
			this.mdbTable.setDataSource(this.reservations)
			this.reservations = this.mdbTable.getDataSource()
			this.previous = this.mdbTable.getDataSource()
		})
	}

	deleteReservation(){
		this.reservationService.deleteReservation(this.reservation._id).subscribe((response) => {
			this.getReservations()
		})
	}

	updateReservation(){
		this.newbookingdate = this.newbookingdate + ", " + this.newbookingtime
		const reservation = new Reservation()
		reservation._id = this.reservation._id
		reservation.reservation_date = this.newbookingdate
		reservation.total = this.reservation.total
		reservation.status = this.reservation.status
		reservation.client_id = this.reservationClient._id
		reservation.style_id = this.editStyle
		this.reservationService.updateReservation(reservation).subscribe((response) => {
			this.getReservations()
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
