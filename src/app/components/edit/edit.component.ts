import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute, private productService: ProductService, private fb: FormBuilder) {
    this.createForm();
  }
  name:string = this.route.snapshot.params.name;
  producto: Producto;
  productForm: FormGroup;

  ngOnInit() {
    this.productService.get(this.name).subscribe(res => {
      this.producto = res.body;
      this.productForm.setValue({
        nombre: this.producto.nombre,
        categoria: this.producto.categoria,
        sabor: this.producto.sabor,
        precio: this.producto.precio,
        estado: this.producto.estado,
      });
    });
  }

  createForm() {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      sabor: ['', Validators.required],
      precio: ['', Validators.required],
      estado: ['', Validators.required],
    });
  }

  edit() {
    this.productService
      .update(this.name, this.productForm.value)
      .subscribe((res: any) => {
        if (!res.error) {
          Swal.fire('', 'Producto actualizado', 'success');
          this.router.navigate(['list']);
        } else {
          Swal.fire('', 'Error al actualizar el producto', 'error');
        }
      });
  }

}
