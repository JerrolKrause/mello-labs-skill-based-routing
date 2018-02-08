import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-priority',
  templateUrl: './product-priority.component.html',
  styleUrls: ['./product-priority.component.scss']
})
export class ProductPriorityComponent implements OnInit {

	public products = ["Conforming", "FHA", " VA", "VA Super Max", " Jumbo Advantage", "CQ IRRRL", "Home Ready", "Home Possible", "40yr I/O", "Executive High Balance", "Streamline (FHA)", "Jumbo Classic/Prime"];

  constructor() { }

  ngOnInit() {
  }

}
