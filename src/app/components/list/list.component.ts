import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import swal from'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private productService: ProductService, private router:Router) {}

  productos: Producto[];

  ngOnInit() {
    this.productService.list().subscribe((res) => {
      this.productos = res.body;
    });
  }

  edit(product: Producto) {
    this.router.navigate(['edit',product.nombre]);
  }

  delete(name: string) {
    this.productService.delete(name).subscribe((res: any) => {
      if (!res.error) {
        swal.fire('', 'Producto eliminado', 'success');
      } else {
        swal.fire('', 'Error eliminado producto', 'error');
      }
    });
  }

}
