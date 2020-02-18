import { Component, OnInit } from '@angular/core';
import { NetworkService, UsuariosService } from 'src/app/services/service.index';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalComponent } from '../../../../components/profile/documentvalidation/modal/modal.component';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage {

  formulario: FormGroup;

  usuario: Usuario;
  user: any = null;
  PasswordRedSocial: boolean = false;
  imagenTemp: string;
  Conexion: boolean;
  archivoSubido = true;


  constructor(
    private _usuarioService: UsuariosService,
    private _networkService: NetworkService,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    public modalController: ModalController) {

    this.formulario = formBuilder.group({
      name: new FormControl('', { updateOn: 'blur' }),
      email: new FormControl('', { updateOn: 'blur' }),
      telephone: new FormControl('', { updateOn: 'blur' }),
      infopersonal: new FormControl('', { updateOn: 'blur' }),
      sexo: new FormControl('', { updateOn: 'blur' })
    }, { updateOn: 'change' });

  }

  async ionViewWillEnter() {

    this.revisarConexion();
    this.user = await this._usuarioService.getUsuario();
    console.log(this.user);

    if (!(this.user.password === ':D')) {
      this.PasswordRedSocial = true;
    }
    if (this.user.archivoSubido) {
      this.archivoSubido = true;
    }
    this.formulario.patchValue({
      name: this.user.name,
      email: this.user.email,
      telephone: this.user.telephone,
      infopersonal: this.user.infopersonal,
      sexo: this.user.sexo,
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
      null,
      this.formulario.value.sexo,
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

  async abrirModalCargar() {
    const modal = await this.modalController.create({
      component: ModalComponent
    });
    return await modal.present();
  }

  async revisarConexion() {
    this.Conexion = false;

    let result;
    return result = await this._networkService.revisarConexion();
  }
}
