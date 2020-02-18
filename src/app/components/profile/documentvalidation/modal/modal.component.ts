import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController, ActionSheetController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UsuariosService } from '../../../../services/service.index';
import { Usuario } from '../../../../models/usuario.model';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})


export class ModalComponent {

  image: any = null;
  token: any;
  user: Usuario;
  imageUser: string = null;
  existeImagen = false;

  constructor(
    public _usuarioService: UsuariosService,
    public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    private storage: Storage,
    private camera: Camera,
    public toastCtrl: ToastController,
  ) {

  }

  async ionViewWillEnter() {
    this.user = await this._usuarioService.getUsuario();

    if (this.user.archivovalidacion) {
      this.existeImagen = true;
      this.imageUser = 'https://lokkl.s3.us-east-2.amazonaws.com/images/validationUserDocumento/' + this.user.archivovalidacion;
    }

  }

  obtenerUsuario() {

  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: 'Take a Photo',
          handler: () => {
            this.selectImageInCamera();
          }
        },
        {
          text: 'Choose from Gallery',
          handler: () => {
            this.selectImageInGallery();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();

  }

  selectImageInCamera() {
    const CAMERA_OPTIONS: CameraOptions = {
      allowEdit: true,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(CAMERA_OPTIONS).then((imageData) => {
      this.existeImagen = false;
      this.image = `data:image/jpeg;base64,${imageData}`;
      this.archivoVerificacion();

    }).catch(err => console.error(err));
  }

  selectImageInGallery() {
    const CAMERA_OPTIONS: CameraOptions = {
      allowEdit: true,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(CAMERA_OPTIONS).then((imageData) => {
      this.existeImagen = false;
      this.image = `data:image/jpeg;base64,${imageData}`;
      this.archivoVerificacion();
    }).catch(err => console.error(err));
  }

  async archivoVerificacion() {

    this.token = await this.storage.get('token') || null;

    await this._usuarioService.archivoValidacion(this.image, this.token)
      .subscribe(async respo => {

        await this.storage.set('token', respo.token);
        await this.storage.set('usuario', respo.user);

        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'Se ha guardado tu imagen.',
          duration: 3000,
          position: 'bottom',
          color: 'success'
        });

        toast.present();
      }
      );
    this.user = await this._usuarioService.getUsuario();

  }

  salir() {
    this.modalController.dismiss();
  }
}