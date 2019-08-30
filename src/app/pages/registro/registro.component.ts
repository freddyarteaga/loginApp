import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() { 
    this.usuario = new UsuarioModel();

    // this.usuario.email = 'freddy.artea@gmail.com';
  }

  onSubmit( form: NgForm ) {

    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });

    Swal.showLoading();


    // console.log('formulario enviado')
    // console.log(this.usuario)
    // console.log(form);
    
    this.auth.nuevoUsuario( this.usuario )
    .subscribe( resp => {
      console.log(resp)
      Swal.close()

      
      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email)
      }

      localStorage.getItem('email')

      this.router.navigateByUrl('/home');

    }, (error) => {
      console.log( error.error.error.message );

      Swal.fire({
        type: 'error',
        title: 'Error al autenticar',
        text: error.error.error.message
      });

    } );

    
  }
  
  

}
