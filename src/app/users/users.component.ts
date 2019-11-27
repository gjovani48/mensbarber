import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md'
import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core'
import { User } from '../models/user'
import { UserService } from '../services/user.service'

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit, AfterViewInit {

	@ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent
	@ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
	private users: any = []
	private previous: any = []
	private headElements = ['Name', 'Phone', 'Email']
	private searchText: string = ''

	private user = new User()
	private style: any = []

	private styles: any = []

	private editStyle: String

	private newbookingdate
	private newbookingtime

	private editFirstname
	private editMiddlename
	private editLastname
	private editPhone
	private editEmail

	constructor(private cdRef: ChangeDetectorRef, private userService: UserService) {}

	@HostListener('input') oninput() {
		this.searchItems()
	}

	ngOnInit() {
    this.getUsers()

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
			this.users = this.mdbTable.getDataSource()
		}

		if (this.searchText) {
			this.users = this.mdbTable.searchLocalDataBy(this.searchText)
			this.mdbTable.setDataSource(prev)
		}
  }


  // Admin functions for user management

  viewUser(id){
    this.userService.viewUser(id).subscribe((response) => {
      this.user = response[0]

      if(this.user.role=="client"){
        window.location.href="/home";
      }

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
      this.getUsers()
    })
  }

  deleteUser(){
    this.userService.deleteUser(this.user._id).subscribe((response) => {
      this.getUsers()
    })

  }


  getUsers(){
		this.userService.getUsers().subscribe((response) => {
			this.users = response
			this.mdbTable.setDataSource(this.users)
			this.users = this.mdbTable.getDataSource()
			this.previous = this.mdbTable.getDataSource()
		})
  }

}
