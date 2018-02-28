import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../models/hospital.model';
import { UsuarioService } from '../usuario/usuario.service';

declare var swal: any;

@Injectable()
export class HospitalService {

  hospital: Hospital;
  totalHospitales: number = 0;
  token: string;

  constructor( public http: HttpClient,
              public _usuarioService: UsuarioService) { }


  cargarHospitales() {
    let url = URL_SERVICIOS + '/hospital';

    return this.http.get( url )
        .map( (resp: any) => {
          this.totalHospitales = resp.total;
          return resp.hospitales;
        });
  }

  obtenerHospital(id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get( url )
          .map( (resp: any) => resp.hospital );
  }


  borrarHospital( id: string) {
    let url = URL_SERVICIOS + '/hospital/' + id;
      url += '?token=' + this._usuarioService.token;

    return this.http.delete( url )
              .map( resp => {
                swal('Hospital borrado', ' Eliminado correctamente', 'success');
              });
  }


  crearHospital( nombre: string ) {
    let url = URL_SERVICIOS + '/hospital';
     url += '?token=' + this._usuarioService.token;

    // Esto retorna un observable
    return this.http.post( url, {nombre} )
          .map( (resp: any) => resp.hospital);
  }


  buscarHospitales( termino: string ) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url )
              .map( (resp: any ) => resp.hospitales);
  }


  actualizarHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, hospital )
          .map( (resp: any) => {
            swal('Hospital Actualizado', hospital.nombre, 'success');
            return resp.hospital;
          });
  }



}
