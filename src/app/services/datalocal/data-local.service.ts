import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { ToastController } from '@ionic/angular';
import { Tours } from '../../models/tour.model';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  tours: Tours[] = [];
  CityGeolocation: string = null;

  constructor(
    private storage: Storage,
    private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }


  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  guardarTour(tour: Tours) {

    let existe = false;
    let mensaje = '';

    for (const peli of this.tours) {
      if (peli.id === tour.id) {
        existe = true;
        break;
      }
    }
    if (existe) {
      this.tours = this.tours.filter(peli => peli.id !== tour.id);
      mensaje = 'Removido de favoritos';
    } else {
      this.tours.push(tour);
      mensaje = 'Agregada a favoritos';
    }

    this.presentToast(mensaje);
    this.storage.set('Favoritos', this.tours);

    return !existe;
  }

  borrarFavorito(tour: Tours) {
    this.tours = this.tours.filter(busqueda => busqueda.id !== tour.id);
    this.storage.set('favoritos', this.tours);
    this.presentToast('Borrado de favoritos');
  }

  async cargarFavoritos() {

    const favoritos = await this.storage.get('Favoritos');
    this.tours = favoritos || [];
    return this.tours;

  }


  async existeEnFavoritos(id) {

    await this.cargarFavoritos();
    const existe = this.tours.find(busqueda => busqueda.id !== id);

    return (existe) ? true : false;
  }

  async existeEnFavoritosSlug(slug) {

    await this.cargarFavoritos();
    const existe = this.tours.find(busqueda => busqueda.slug !== slug);

    return (existe) ? true : false;
  }

  /**
   * Guardar Location
   */

  async obtenerUbicacion() {

    const location = this.storage.get('Location');
    return location;
  }
}// end class
