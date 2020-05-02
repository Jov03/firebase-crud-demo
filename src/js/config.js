require.config({
  baseUrl: "src",

  paths: {
    //Libraries
    'angular': 'bower_components/angular/angular',
    'angular-ui-router': 'bower_components/angular-ui-router/release/angular-ui-router.min',
    'jquery': 'bower_components/jquery/dist/jquery.min',
    '@firebase/app': 'bower_components/firebase/firebase',
    'firestore': 'bower_components/firebase/firebase-firestore',
    'firebase-functions': 'bower_components/firebase/firebase-functions',
    'firebase-auth': 'bower_components/firebase/firebase-auth',

    //custom JS
    'app': 'js/app'
  },

  shim: {
    'app': ['angular-ui-router'],
    'angular': { exports: 'angular', deps: ['jquery'] },
    'angular-ui-router': ['angular'],
    'firestore': ['@firebase/app'],
    'firebase-auth': ['@firebase/app'],
    'firebase-functions': ['@firebase/app'],
  },

  // kick start application
  deps: ['app']

});