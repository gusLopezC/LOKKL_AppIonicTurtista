import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

export enum ConnectionStatus {
  Online,
  Offline
}

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);

  constructor(
    private network: Network,
    private toastController: ToastController,
    public loadingController: LoadingController,
    public toastCtrl: ToastController,
    private plt: Platform) {
    this.plt.ready().then(() => {
      this.initializeNetworkEvents();
      let status = this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
      this.status.next(status);
    });

  }

  public initializeNetworkEvents() {

    this.network.onDisconnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Online) {
        console.log('WE ARE OFFLINE');
        this.updateNetworkStatus(ConnectionStatus.Offline);
      }
    });

    this.network.onConnect().subscribe(() => {
      if (this.status.getValue() === ConnectionStatus.Offline) {
        console.log('WE ARE ONLINE');
        this.updateNetworkStatus(ConnectionStatus.Online);
      }
    });
  }

  private async updateNetworkStatus(status: ConnectionStatus) {
    this.status.next(status);

    let connection = status == ConnectionStatus.Offline ? 'Offline' : 'Online';
    let toast = this.toastController.create({
      message: `You are now ${connection}`,
      duration: 3000,
      position: 'bottom'
    });
    toast.then(toast => toast.present());
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
  }

  async revisarConexion(retries = 1) {

    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();

    return new Promise(resolve => {
      if (this.getCurrentNetworkStatus() === ConnectionStatus.Online) {
        loading.dismiss();
        resolve(true);
      } else {
        setTimeout(() => {
          if (retries === 5) {
            retries++;
            return this.revisarConexion(retries);
          } else {
            loading.dismiss();
            this.presentToast();
            resolve(false);
          }
        }, 1000);

      }
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Ha ocurrido un error vuelve a intentar',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

}// end class
