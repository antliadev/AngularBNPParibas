import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Product } from '../models/product.model';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "https://localhost:44344/";

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  create(product: Product): Observable<Product> {
    console.log('create service');
    return this.http.post<Product>(this.baseUrl + "v1/Product/Save", product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl + "v1/Product/FetchProducts").pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl + "v1/Product/FetchProductById?Id="}${id}`;
    return this.http.get<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  updateStatus(product: Product): Observable<Product> {
    const url = `${this.baseUrl + "v1/Product/UpdateStatus?Id="}${product.idProduct}`;
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl + "v1/Product/Update?Id="}${product.idProduct}`;
    return this.http.put<Product>(url, product).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(idProduct: number): Observable<Product> {
    const url = `${this.baseUrl + "v1/Product/Delete?Id="}${idProduct}`;
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}
