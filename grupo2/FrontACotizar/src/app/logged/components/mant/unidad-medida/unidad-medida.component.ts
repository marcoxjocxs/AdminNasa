import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UnidadMedidaService } from '../../../../services/unidad-medida.service';

declare var $: any;
@Component({
  selector: 'app-unidad-medida',
  templateUrl: './unidad-medida.component.html',
  styleUrls: ['./unidad-medida.component.css']
})
export class UnidadMedidaComponent implements OnInit, OnDestroy {

  unidadMedidas;
  subscription: Subscription;

  objNewUnidadMedida = {
    um_nom: '',
    um_abr: ''
  }

  objUnidadMedida = {
    um_id: '',
    um_nom: '',
    um_abr: ''
  }

  constructor(private _sUnidadMedida: UnidadMedidaService, private _sRouter: Router) { }

  ngOnInit() {


    this.traerUnidadMedida()
  }

  ngOnDestroy() {
    try {
      this.subscription.unsubscribe();
    } catch (error) {

    }
  }

  traerUnidadMedida() {
    this.subscription = this._sUnidadMedida.getUnidadMedida().subscribe((resultado: any) => {
      console.log(resultado);
      this.unidadMedidas = resultado;
    })
  }
  CrearUnidadMedida() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos guardando la Unidad Medida',
      allowOutsideClick: false,
      showConfirmButton: false
    })

    this.subscription = this._sUnidadMedida.postUnidadMedida(this.objNewUnidadMedida)
      .subscribe((rpta) => {
        if (rpta.contenido.um_id) {
          Swal.fire({
            title: 'Éxito!',
            text: 'La unidad de medida se ha creado exitosamente!',
            confirmButtonText: 'Ir a Unidad Medida',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.traerUnidadMedida();
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
    this._sUnidadMedida.getUnidadMedidaById(id).subscribe((rpta) => {
      // console.timeEnd("demoreishon");
      /*   Swal.close(); */
      console.log(rpta.UnidadMedida.um_id);

      if (rpta.UnidadMedida.um_id) {
        this.objUnidadMedida = rpta.UnidadMedida;
        $("#modalEditar").modal("show");
      }

    })
  }
  AbrirModalCrearUnidadMedida() {
    $("#modalCrear").modal("show");
  }

  Guardar() {
    let objUm2 = {
      UnidadMedida: this.objUnidadMedida
    }
    this._sUnidadMedida.putUnidadMedida(objUm2).subscribe((rpta) => {
      console.log(objUm2);
      if (rpta.content.um_id) {
        this.traerUnidadMedida();
        $("#modalEditar").modal("hide");
      }
    })
  }

  eliminarUnidadMedida(id) {
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

        this._sUnidadMedida.deleteUnidadMedida(id).subscribe((rpta) => {
          console.log(rpta);

          if (rpta.id) {
            Swal.fire(
              'Eliminado!',
              'Ha sido eliminado.',
              'success'
            );
            this.traerUnidadMedida();
          }
        })
      }
    })
  }

}
