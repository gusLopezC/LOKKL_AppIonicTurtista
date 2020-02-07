import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController, ActionSheetController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UsuariosService } from '../../../../services/service.index';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})


export class ModalComponent implements OnInit {

  image: any = null;
  token: any;

  constructor(
    public _usuarioService: UsuariosService,
    public actionSheetController: ActionSheetController,
    public modalController: ModalController,
    private storage: Storage,
    private camera: Camera,
    public toastCtrl: ToastController,
  ) {

  }

  ngOnInit() {
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
      this.image = `data:image/jpeg;base64,${imageData}`;
      this.archivoVerificacion();
    }).catch(err => console.error(err));
  }

  async archivoVerificacion() {

    this.token = await this.storage.get('token') || null;

    this._usuarioService.archivoValidacion(this.image, this.token)
      .subscribe(async respo => {

        await this.storage.set('token', respo.token);
        await this.storage.set('usuario', respo.usuario);

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

  }

  salir() {
    this.modalController.dismiss();
  }
}