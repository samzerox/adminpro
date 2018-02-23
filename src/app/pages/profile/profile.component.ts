import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

    usuario: Usuario;

    imagenSubir: File;
    imagenTemp: string;

    constructor( public _usuaioService: UsuarioService ) {
      this.usuario = this._usuaioService.usuario;
    }

    ngOnInit() {
    }

    guardar( usuario: Usuario ) {

      this.usuario.nombre = usuario.nombre;

      if ( !this.usuario.google ) {
        this.usuario.email = usuario.email;
      }

      this._usuaioService.actualizarUsuario( this.usuario )
            .subscribe();
    }

    seleccionImagen( archivo: File) {
      if ( !archivo ) {
        this.imagenSubir = null;
          return;
      }

      if ( archivo.type.indexOf('image') < 0 ) {
        swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
        this.imagenSubir = null;
        return;
      }
       this.imagenSubir = archivo;

       let reader = new FileReader();
       let urlImagenTemp = reader.readAsDataURL( archivo );

       reader.onloadend = () => { this.imagenTemp = reader.result; };

    }

    cambiarImagen() {
      this._usuaioService.cambiarImagen( this.imagenSubir, this.usuario._id );
    }

}
