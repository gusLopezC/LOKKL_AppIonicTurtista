import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_AWS_S3 = environment.URL_AWS;

@Pipe({
  name: 'imagenprofile'
})
export class ImagenprofilePipe implements PipeTransform {

  public onlineOffline: boolean = navigator.onLine;

  transform(imagen: string, tipo: string = 'tours'): any {

    let url = URL_AWS_S3 + '/images/';

    if (!imagen) {
      return 'assets/img/default/avatar.png';
    }

    if (imagen.indexOf('https') >= 0) {
      return imagen;
    }

    if (!this.onlineOffline && tipo === 'profile') {
      return 'assets/img/default/avatar.png';
    }

    if (imagen === 'avatar3.png' && tipo === 'profile') {
      return 'assets/img/default/avatar.png';
    }

    switch (tipo) {

      case 'profile':
        url += 'profile/' + imagen;
        break;

      case 'tours':
        url += 'tours/' + imagen;
        break;

      case 'imagenesfondo':
        url += 'imagenesfondo/' + imagen;
        break;


      default:
        url += '/default/aaa';


    }
    return url;
  }

}
