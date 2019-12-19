// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebaseConfig: {
    apiKey: 'AIzaSyAPcFOSeNlDd_6OCygtz5Phm21CFgmxU_M',
    authDomain: 'lokklappandroid.firebaseapp.com',
    databaseURL: 'https://lokklappandroid.firebaseio.com',
    projectId: 'lokklappandroid',
    storageBucket: 'lokklappandroid.appspot.com',
    messagingSenderId: '809842101838',
    appId: '1:809842101838:web:8d0db8203307053db8fd1f',
    measurementId: 'G-YLLTZT97SS'
  },
  // apiUrl: 'http://localhost:8001',
  apiUrl: 'https://lokkl.ml',
  URL_AWS: 'https://lokkl.s3.us-east-2.amazonaws.com',
  googleWebClientId: '409077895951-qaitrdbd57oji686am5pipdngh377r98.apps.googleusercontent.com'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
