import { Component, OnInit } from '@angular/core';
import { NetworkService, UsuariosService } from 'src/app/services/service.index';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  formulario: FormGroup;

  usuario: Usuario;
  user: any = null;
  PasswordRedSocial: boolean = false;
  imagenTemp: string;
  Conexion: boolean;

  constructor(
    private _usuarioService: UsuariosService,
    private _networkService: NetworkService,
    private formBuilder: FormBuilder,
    public alertController: AlertController) {

    this.formulario = formBuilder.group({
      name: new FormControl('', { updateOn: 'blur' }),
      telephone: new FormControl('', { updateOn: 'blur' }),
      infopersonal: new FormControl('', { updateOn: 'blur' })
    }, { updateOn: 'change' });

  }

  async ngOnInit() {

    this.revisarConexion();
    this.user = await this._usuarioService.getUsuario();

    if (!(this.user.password === ':D')) {
      this.PasswordRedSocial = true;
    }
    this.formulario.patchValue({
      name: this.user.name,
      telephone: this.user.telephone,
      infopersonal: this.user.infopersonal,
    });
  }

  async actualizarInfo() {

    const usuario = new Usuario(
      this.formulario.value.name,
      this.user.email,
      null,
      null,
      this.formulario.value.telephone,
      this.formulario.value.infopersonal,
      null,
      null,
      this.user.id,
    );
    this.revisarConexion().then(async (resp) => {
      if (resp) {
        const valido = await this._usuarioService.actualizarUsuario(usuario);
        if (valido) {
          const alert = await this.alertController.create({
            header: 'Success',
            subHeader: 'Your profile has been updated',
            buttons: ['OK']
          });
          await alert.present();
        }
      }
    });

  }

  async onUpload(e) {

    console.log('Actualizar foto');

    const file = e.target.files[0];

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(file);
    reader.onloadend = () => this.imagenTemp = reader.result as string;

    this.revisarConexion().then(async (resp) => {
      if (resp) {
        const valido = this._usuarioService.cambiarImagen(file);
        if (valido) {
          const alert = await this.alertController.create({
            header: 'Sucess',
            subHeader: 'Your photo has been updated',
            buttons: ['OK']
          });
          await alert.present();
        }
      }
    });
  }

  async eliminarCuenta() {

    this.revisarConexion().then(async (resp) => {
      if (resp) {

        const valido = this._usuarioService.borrarUsuario(this.user.id);
        // .subscribe(respo => this._usuarioService.logout())
        if (valido) {
          const alert = await this.alertController.create({
            header: 'Sucess',
            subHeader: 'Your account has been deleted',
            buttons: ['OK']
          });
          await alert.present();
          this._usuarioService.logout();
        }
      }
    });
  }


  async revisarConexion() {
    this.Conexion = false;

    let result;
    return result = await this._networkService.revisarConexion();
  }
}
