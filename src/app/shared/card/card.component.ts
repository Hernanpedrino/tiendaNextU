import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  template: `
    <p>
      card works!
    </p>
  `,
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
