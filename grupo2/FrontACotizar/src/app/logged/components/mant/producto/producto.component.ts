import { Component, OnInit,OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProductoService } from '../../../../services/producto.service';

declare var $: any;
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit ,OnDestroy{


  productos;
  subscripcion: Subscription;

  objProductoNew = {
    prod_nomb: '',
  }
  objProducto = {
    prod_id: '',
    prod_nomb: '',
  }

  constructor(private _sProductos:ProductoService,private _sRouter:Router) { }

  ngOnInit() {
    this.traerProductos();
  }
  traerProductos() {
    this.subscripcion = this._sProductos.getProducto()
      .subscribe((resultado) => {
        this.productos = resultado;
      });
  }
  ngOnDestroy(){
    try {
      this.subscripcion.unsubscribe();
    } catch (error) {

    }
  }
  CrearProducto() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos guardando el Producto',
      allowOutsideClick: false,
      showConfirmButton: false
    })

    this.subscripcion = this._sProductos.postProducto(this.objProductoNew)
      .subscribe((rpta) => {
        if (rpta.contenido.prod_id) {
          // si tiene un campo id asignado, implica que el objeto fue creado
          Swal.fire({
            title: 'Éxito!',
            text: 'El producto se ha creado exitosamente!',
            confirmButtonText: 'Ir a Productos',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.traerProductos();
            }
          })

        }
      })
    $("#modalCrear").modal("hide");
  }
  Cancelar() {
    $("#modalEditar").modal("hide");
    $("#modalCrear").modal("hide");
  }
  abrirModalEditar(id) {
    this._sProductos.getProductoById(id).subscribe((rpta) => {
      // console.timeEnd("demoreishon");
      /*   Swal.close(); */
      console.log(rpta.Producto.prod_id);


      if (rpta.Producto.prod_id) {
        // la factura existe y ya llegó
        console.log(id);
        console.log(rpta);
        this.objProducto = rpta.Producto;

        $("#modalEditar").modal("show");
      }
    })
  }
  AbrirModalCrearProducto() {
    $("#modalCrear").modal("show");
  }

  Guardar() {
    let objPro2 = {
      Producto: this.objProducto
    }
    this._sProductos.putProducto(objPro2).subscribe((rpta) => {
      console.log(objPro2);
      if (rpta.content.prod_id) {
        this.traerProductos();
        $("#modalEditar").modal("hide");
      }
    })
  }
  eliminarProducto(id) {
    console.log(id);

    Swal.fire({
      title: 'Estas Seguro?',
      text: "No hay vuelta atras!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!'
    }).then((result) => {
      if (result.value) {

        console.log("ddd");

        this._sProductos.deleteProducto(id).subscribe((rpta) => {
          console.log(rpta);

          if (rpta.id) {
            Swal.fire(
              'Eliminado!',
              'Ha sido eliminado.',
              'success'
            );
            this.traerProductos();
          }
        })
      }
    })
  }
}
