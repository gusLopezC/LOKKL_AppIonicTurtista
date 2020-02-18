import { Component, OnInit } from '@angular/core';
import { NetworkService, UsuariosService } from 'src/app/services/service.index';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Storage } from '@ionic/storage';
import { AlertController, ToastController } from '@ionic/angular';
import { DatosPersonales } from 'src/app/models/datosPersonales.model';

@Component({
  selector: 'app-emergencia',
  templateUrl: './emergencia.page.html',
  styleUrls: ['./emergencia.page.scss'],
})
export class EmergenciaPage implements OnInit {

  formulario: FormGroup;

  usuario: Usuario;
  user: any = null;
  datospersonales: DatosPersonales = new DatosPersonales('', '', '', '', '');
  token: string;

  constructor(
    private _usuarioService: UsuariosService,
    private _networkService: NetworkService,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    public toastController: ToastController
  ) {

    this.formulario = formBuilder.group({
      name: new FormControl('', { updateOn: 'blur' }),
      email: new FormControl('', { updateOn: 'blur' }),
      telephone: new FormControl('', { updateOn: 'blur' }),
      parentesco: new FormControl('', { updateOn: 'blur' }),
    }, { updateOn: 'change' });

    this.obtenerInformacion();
  }

  async ngOnInit() {

    this.obtenerInformacion();

  }


  async obtenerInformacion() {
    this.user = await this._usuarioService.getUsuario();
    this.token = await this._usuarioService.getToken();

    this._usuarioService.obtenerInformacionContacto(this.user.id, this.token).subscribe(
      resp => {
        console.log(resp)
        if (resp.guia.length < 1) {
          console.log();
        } else {
          this.datospersonales = resp.guia[0];

          this.formulario.patchValue({
            name: this.datospersonales.NameContactoEmergencia,
            email: this.datospersonales.EmailContactoEmergencia,
            telephone: this.datospersonales.NumContactoEmergencia,
            parentesco: this.datospersonales.ParentescoEmergencia,
          });
        }
      }
    );
  }

  async actualizarInfoContactoEmergencia() {

    this.user = await this._usuarioService.getUsuario();

    const datos = new DatosPersonales(

      this.formulario.value.name,
      this.formulario.value.telephone,
      this.formulario.value.email,
      this.formulario.value.parentesco,
      this.user.id,
    );

    this._usuarioService.guardarContactoemergencia(datos)
      .subscribe(async (resp: any) => {


        const toast = await this.toastController.create({
          message: 'Informacion actualizada.',
          color: 'success',
          duration: 2000
        });
        toast.present();
        // this.router.navigate(['/users/account-welcome'])
      });

  }

}
