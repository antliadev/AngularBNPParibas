import { Component, OnInit } from '@angular/core';
import { Product } from './models/product.model';
import { ProductService } from './service/product.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BNPParibas';

  products: Product[];

  product: Product = {
    idProduct: null
    , idCategory: null
    , description: null
    , active: null
    , category: null
  }

  displayedColumns = ['description', 'active', 'action']

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.readProduct();
  }

  readProduct(): void {
    this.productService.read().subscribe(products => {
      this.products = products
    })
  }

  createProduct(): void {
    if (this.product.idProduct == null) {
      this.productService.create(this.product).subscribe(() => {
        this.productService.showMessage("Produto criado com sucesso!");
        this.clearFields();
        this.readProduct();
      })
    }
    else {
      this.productService.update(this.product).subscribe(() => {
        this.productService.showMessage("Produto atualizado com sucesso!");
        this.clearFields();
        this.readProduct();
      })
    }
  }

  changeStatus(row): void {
    this.productService.updateStatus(row).subscribe(() => {
      this.productService.showMessage("Status atualizado com sucesso!");
      this.clearFields();
      this.readProduct();
    })
  }

  editProduct(row): void {
    this.productService.readById(row.idProduct).subscribe(product => {
      this.productService.showMessage("Produto editado com sucesso!");
      this.product = product;
    });
  }

  deleteProduct(row): void {
    this.productService.delete(row.idProduct).subscribe(() => {
      this.productService.showMessage("Produto deletado com sucesso!");
      this.clearFields();
      this.readProduct();
    })
  }

  clearFields(): void {
    this.product.description = null;
    this.product.idProduct = null;
  }

  cancel(): void {
    this.product.description = null;
    this.product.idProduct = null;
  }
}
