// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  firebaseConfig: {
    apiKey: "AIzaSyATdDxbSq-svZhQ835riaDHh9u0z4BpazI",
    authDomain: "lokklandroid.firebaseapp.com",
    databaseURL: "https://lokklandroid.firebaseio.com",
    projectId: "lokklandroid",
    storageBucket: "lokklandroid.appspot.com",
    messagingSenderId: "934468496584",
    appId: "1:934468496584:web:6e215761c7083bf89f09fd",
    measurementId: "G-MY74C6R0GY"

  },
  // apiUrl: 'http://192.168.1.237:8001',
  apiUrl: 'https://api.lokkl.com/',
  URL_AWS: 'https://lokkl.s3.us-east-2.amazonaws.com',
  googleWebClientId: '934468496584-na6ekv4cm9vps0dudst0u92bqi0djig0.apps.googleusercontent.com'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
