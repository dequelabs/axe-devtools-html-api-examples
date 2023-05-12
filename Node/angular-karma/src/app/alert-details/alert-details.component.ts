import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/products';

@Component({
  selector: 'app-alert-details',
  templateUrl: './alert-details.component.html',
  styleUrls: ['./alert-details.component.css']
})
export class AlertDetailsComponent implements OnInit {
  @Input()
  product!: Product;

  @Input() isUnchanged: any;

  @Output() notify = new EventEmitter<Product>();

  constructor() { }

  ngOnInit(): void {
  }

  clickChildMe()
  {
    this.notify.emit(this.product);
  }

}
