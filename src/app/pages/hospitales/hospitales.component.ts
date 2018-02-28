import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( public _hospitalService: HospitalService,
                public _modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
              .subscribe( resp => this.cargarHospitales() );
  }

  // mostarModal( id: string ) {

  //   this._modalUploadService.mostrarModal('hospitales', id );

  // }


  buscarHospital( termino: string) {

    this.cargando = true;

    if ( termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospitales( termino )
              .subscribe( hospital => {

                this.hospitales = hospital;
                this.cargando = false;
              });

  }


  cargarHospitales() {

    this.cargando = true;
    this._hospitalService.cargarHospitales( )
          .subscribe( hospitales => {
             this.hospitales = hospitales;
            this.cargando = false;
          });
  }


  crearHospital() {
    swal('Nombre del Hospital:', {
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    })
    .then( (valor: string) => {

      if ( !valor || valor.length === 0) {
        return;
      }
      this._hospitalService.crearHospital( valor )
              .subscribe( () => this.cargarHospitales() );

    });
  }


  guardarHospital( hospital: Hospital) {
    this._hospitalService.actualizarHospital( hospital )
            .subscribe();
  }


  borrarHospital( hospital: Hospital ) {

      this._hospitalService.borrarHospital( hospital._id)
                  .subscribe( () => {
                    this.cargarHospitales();
                  });
  }

  actualizarImagen( hospital: Hospital) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id );
  }


}
