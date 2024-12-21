import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor(private router:Router ) { }

  ngOnInit(): void {

}
products = [
  {  name: 'Feed 1', description: 'Description of Product 1',image:"./assets/sample/sample 1.jpg", price: 100 },
  {  name: 'Medicine 1', description: 'Description of Product 1',image:"./assets/sample/sample 2.jpg", price: 100 },
  {  name: 'Feed 2', description: 'Description of Product 2',image:"./assets/sample/sample 1.jpg", price: 200 },
  {  name: 'Medicine 2', description: 'Description of Product 2',image:"./assets/sample/sample 2.jpg", price: 200 },
  {  name: 'Feed 3', description: 'Description of Product 3',image:"./assets/sample/sample 1.jpg", price: 300 },
  {  name: 'Medicine 3', description: 'Description of Product 3', image:"./assets/sample/sample 2.jpg",price: 300 },

];

 
currentPage = 0;
itemsPerPage = 3;

get paginatedProducts() {
  const start = this.currentPage * this.itemsPerPage;
  return this.products.slice(start, start + this.itemsPerPage);
}

nextPage() {
  if ((this.currentPage + 1) * this.itemsPerPage < this.products.length) {
    this.currentPage++;
  }
}

previousPage() {
  if (this.currentPage > 0) {
    this.currentPage--;
  }
}
signUp(){
  this.router.navigate(['/registration'])
}

}