import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md'
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core'
import { ReservationService } from '../services/reservation.service'
import { Reservation } from '../models/reservation'
import { UserService } from '../services/user.service'
import { StyleService } from '../services/style.service'
import { Style } from '../models/style'
import { User } from '../models/user'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, AfterViewInit{

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent
	@ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
	private haircuts: any = []
	private previous: any = []
	private headElements = ['Style', 'Date', 'Status']
  private searchText: string = ''

	public user = new User()
	private style

  private editFirstname
	private editMiddlename
	private editLastname
	private editPhone
	private editEmail

	private bookingdate
	private bookingtime
	public reservationTime = [];

  	constructor(private styleService: StyleService, private reservationService: ReservationService, private userService: UserService, private cdRef: ChangeDetectorRef,) { }

	ngOnInit() {
      if(localStorage.getItem('token')){
        var id = localStorage.getItem('token');
        this.viewUser(id.slice(0,24));
      }

    this.style = new Style()
	}

	ngAfterViewInit() {
		this.mdbTablePagination.setMaxVisibleItemsNumberTo(5)
		this.mdbTablePagination.calculateFirstItemIndex()
		this.mdbTablePagination.calculateLastItemIndex()
		this.cdRef.detectChanges()
  }

  getUser(){
    this.reservationService.getUserReservations(this.user._id).subscribe((response)=>{
      this.haircuts = response
      this.mdbTable.setDataSource(this.haircuts)
      this.haircuts = this.mdbTable.getDataSource()
      this.previous = this.mdbTable.getDataSource()
    })
  }

  editUser(){
    this.editFirstname = this.user.firstname
    this.editMiddlename = this.user.middlename
    this.editLastname = this.user.lastname
    this.editPhone = this.user.phone
    this.editEmail = this.user.email
  }

  updateUser(){
    this.user.firstname = this.editFirstname
    this.user.middlename = this.editMiddlename
    this.user.lastname = this.editLastname
    this.user.phone = this.editPhone
    this.user.email = this.editEmail
    this.userService.updateUser(this.user).subscribe((response) => {
      this.getUser()
    })
  }

  viewUser(id){
    this.userService.viewUser(id).subscribe((response) =>{
      this.user = response[0];
      this.getUser();
    })
  }

  getStyle(id){
    this.styleService.getStyle(id).subscribe((response) => {
      this.style = response[0]
    })
  }

  submitBooking(){
    const reservation = new Reservation()
    this.bookingdate = this.bookingdate + ", " + this.bookingtime
    reservation.reservation_date = this.bookingdate
    reservation.client_id =  this.user._id
    reservation.style_id = this.style._id
    reservation.total = this.style.price
    reservation.status = "Reserved"
    this.reservationService.addReservation(reservation).subscribe((response) => {
		this.getUser()
    })
  }

  getReservationDate(){
    this.bookingdate = this.bookingdate;
    this.reservationService.getReservationDate(this.bookingdate).subscribe((response) => {
		this.reservationTime = response;
    })
  }
}
