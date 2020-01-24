// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebaseConfig: {
    apiKey: 'AIzaSyDkQVb1mFwS2cRyxS4d5_p-njAxL60Hohc',
    authDomain: 'lokklandroid.firebaseapp.com',
    databaseURL: 'https://lokklandroid.firebaseio.com',
    projectId: 'lokklandroid',
    storageBucket: 'lokklandroid.appspot.com',
    messagingSenderId: '934468496584',
    appId: '1:934468496584:web:a6ae8a4738aba31b9f09fd',
    measurementId: 'G-HGHL7PMRVZ'
  },
  // apiUrl: 'http://192.168.1.237:8001',
  apiUrl: 'https://api.lokkl.com/',
  URL_AWS: 'https://lokkl.s3.us-east-2.amazonaws.com',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
