import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private productService: ProductService, private fb: FormBuilder) { 
    this.createForm();
  }

  productForm: FormGroup;

  ngOnInit(): void {
  }

  createForm() {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      sabor: ['', Validators.required],
      precio: ['', Validators.required],
      estado: [true, Validators.required],
    });
  }

  create() {
    this.productService.insert(this.productForm.value)
      .subscribe((res:any) => {
        if (!res.error) {
          Swal.fire('', 'Producto agregado', 'success');
        } else {
          Swal.fire('', 'Error al agregar el producto', 'error');
        }
      });
  }
}
