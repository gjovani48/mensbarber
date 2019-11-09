import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md'
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core'
import { Reservation } from '../models/reservation'
import { Style } from '../models/style'
import { ReservationService } from '../services/reservation.service'
import { StyleService } from '../services/style.service'

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
	private headElements = ['Client', 'Style', 'Date', 'Time', 'Status', 'Action']
	private searchText: string = ''

	private reservation: any = []
	private style: any = []

	private styles: any = []

	private editStyle: String

	private newbookingdate
	private newbookingtime

	constructor(private cdRef: ChangeDetectorRef, private reservationService: ReservationService, private styleService: StyleService) {}

	@HostListener('input') oninput() {
		this.searchItems()
	}

	ngOnInit() {
		this.getReservations()
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

	getReservations(){
		this.reservationService.getReservations().subscribe((response) => {
			this.reservations = response
			this.mdbTable.setDataSource(this.reservations)
			this.reservations = this.mdbTable.getDataSource()
			this.previous = this.mdbTable.getDataSource()
		})
	}
	
	deleteReservation(id){
		if(confirm("Confirm Delete? ")){
			this.reservationService.deleteReservation(id).subscribe((response) => {

				alert("Reservation Deleted")
				this.getReservations()
			})
		}
	}

	editReservation(id){
		
		this.reservationService.getReservation(id).subscribe((response) => {
			this.reservation = response
			this.style = this.reservation.style_id
			this.editStyle = this.style._id
			this.styleService.getStyles().subscribe((response) => {
				this.styles = response
			})
		})
	}

	updateReservation(){
		this.newbookingdate = this.newbookingdate + ", " + this.newbookingtime
		const reservation = new Reservation()
		reservation._id = this.reservation._id
		reservation.reservation_date = this.newbookingdate
		reservation.total = this.reservation.total
		reservation.payment_status = this.reservation.payment_status
		reservation.client_id = this.reservation.client_id
		reservation.style_id = this.editStyle
		if(confirm("Save changes?")){
			this.reservationService.updateReservation(reservation).subscribe((response) => {
				alert("Booking Successful");
				this.getReservations()
			})
		}
	}
}