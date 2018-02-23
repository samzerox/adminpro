import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor( public _usuariosService: UsuarioService,
                public _modalUpladoService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUpladoService.notificacion
              .subscribe( resp => this.cargarUsuarios() );
  }

  mostarModal( id: string ) {
    this._modalUpladoService.mostrarModal('usuarios', id );
  }

  cargarUsuarios() {

    this.cargando = true;
    this._usuariosService.cargarUsuarios( this.desde )
          .subscribe( (resp: any) => {
            this.totalRegistros = resp.total;
            this.usuarios = resp.usuarios;
            this.cargando = false;
          });
  }

  cambiarDesde( valor: number) {
   let desde = this.desde + valor;
   console.log(desde);


   if (desde >= this.totalRegistros ) {
     return;
   }

   if (desde < 0) {
     return;
   }

   this.desde += valor;
   this.cargarUsuarios();
  }

  buscarUsuario( termino: string) {

    this.cargando = true;

    if ( termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }


    this._usuariosService.buscarUsuarios( termino )
              .subscribe( (usuarios: Usuario[]) => {

                this.usuarios = usuarios;
                this.cargando = false;
              });

  }

  borrarUsuario( usuario: Usuario ) {
      if ( usuario._id === this._usuariosService.usuario._id) {
        swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
        return;
      }

      swal({
        title: 'Estas seguro?',
        text: 'Esta a punto de borrar a ' + usuario.nombre,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      })
      .then( borrar => {
          console.log( borrar );

        if (borrar) {
          this._usuariosService.borrarUsuario( usuario._id)
                    .subscribe( borrado => {
                      console.log(borrado);
                      this.cargarUsuarios();
                    });
        }
      });

  }

  guardarUsuario( usuario: Usuario) {
    this._usuariosService.actualizarUsuario( usuario)
            .subscribe();
  }

}
