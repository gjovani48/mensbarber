import { Component, OnInit } from '@angular/core';
import { Style } from '../models/style'
import { StyleService } from '../services/style.service'


@Component({
  selector: 'app-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.scss']
})
export class StylesComponent implements OnInit {


  private styles: Style[]
  private style = new Style();

  private img;
  
  constructor(
    private styleService: StyleService
  ) { }

  ngOnInit() {
    this.getStyles()
  }


  getStyles(){
    this.styleService.getStyles().subscribe((response) => {
      this.styles = response
    })
  }

  getStyle(id){
    this.styleService.getStyle(id).subscribe((response) => {
      this.style.name = response[0].name;
      this.style.description = response[0].description;
      this.style.price = response[0].price;
      this.style.image = response[0].image;

      //this.img = this.style[0].image;
      
    })
  }
  
  submitBooking(){
    alert("Booked")
  }
}
