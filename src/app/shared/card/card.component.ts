import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() public imgUrl: string = 'https://picsum.photos/id/237/200/300';
  @Input() public precio: number = 0;
  @Input() public stock: number = 0;
  @Input() public nombre: string = 'Producto';
  constructor() { }

  ngOnInit(): void {
  }

}
