import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Producto } from '../models/product';
import { config } from '../shared/config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<any>(config.baseUrl + 'product')
      .pipe(catchError(err => {
        throw err;
      }))
  }

  get(name: string): Observable<any> {
    return this.http.get<any>(config.baseUrl + `product/${name}`);
  }

  insert(product: Producto): Observable<any> {
    return this.http.post<any>(config.baseUrl + 'product', product).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  update(name: string, product: Producto): Observable<any> {
    return this.http.put(config.baseUrl + `product/${name}`, product).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  delete(name: string) {
    return this.http.delete(config.baseUrl + `product/${name}`).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }
}
