import { Component, OnInit } from '@angular/core';
import { ProdutcsService } from '../../services/produtcs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public items:any = [];
  constructor(private productsServices: ProdutcsService) { }

  ngOnInit(): void {
    this.productsServices.getProducts().subscribe(
      resp=>{
        resp.forEach(doc=>{
          this.items.push(doc);
        })
      }
    );
  }

}
