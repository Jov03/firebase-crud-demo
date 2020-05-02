define(['angular', '@firebase/app', 'firestore'], function (angular, firebase) {
    'use strict';

    angular.module('FirebaseServiceModule', []).factory('firebaseService', ['$q', function ($q) {
        var service = {};
        var authenticated = false;

        const firebaseConfig = {
            apiKey: "AIzaSyBDl_W7IED6xwWjCe48zY-GAKj1fvRqNec",
            authDomain: "test-01-5e289.firebaseapp.com",
            databaseURL: "https://test-01-5e289.firebaseio.com",
            projectId: "test-01-5e289",
            storageBucket: "test-01-5e289.appspot.com",
            messagingSenderId: "702121624030",
            appId: "1:702121624030:web:56314f33230791288e9d4f",
            measurementId: "G-RPZ4CG63DS"
        };
        firebase.initializeApp(firebaseConfig);


        console.log(firebase);
        console.log(firebase.app().name);
        console.log(firebase.auth());

        service.signIn = function (email, password) {
            return firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                authenticated = true;
            }).catch(function (error) {
                console.log(error.code, error.message);
            });
        }

        service.signOut = function () {
            var defer = $q.defer();
            firebase.auth().signOut().then(() => {
                authenticated = false;
                defer.resolve();
            }).catch(function (error) {
                console.log(error.code, error.message);
                defer.reject();
            });
            return defer.promise;
        }

        service.isAuthenticated = function () {
            if (!!firebase.auth().currentUser || authenticated) {
                return true;
            }
            return false;
        }

        service.getCurrentUser = function () {
            return firebase.auth().currentUser;
        }

        service.getCompanies = function () {
            var db = firebase.firestore();
            return db.collection("Companies").get().then(res => {
                return res.docs.map(element => {
                    return { id: element.id, ...element.data() }
                });
            });
        }

        service.getCompany = function (documentId) {
            var defer = $q.defer();
            var db = firebase.firestore();
            db.collection("Companies").doc(documentId).get().then(function (doc) {
                defer.resolve({ id: doc.id, ...doc.data() });
            }).catch(function (error) {
                console.error("Error adding document: ", error);
                defer.reject();
            });
            return defer.promise;
        }

        service.addCompany = function (company) {
            var defer = $q.defer();
            var db = firebase.firestore();
            db.collection("Companies").doc().set(company).then(function () {
                console.log("Document written");
                defer.resolve();
            }).catch(function (error) {
                console.error("Error adding document: ", error);
                defer.reject();
            });
            return defer.promise;
        }

        service.editCompany = function (company) {
            var defer = $q.defer();
            var db = firebase.firestore();
            db.collection("Companies").doc(company.id).set(company).then(function () {
                console.log("Document written with ID: ", company.id);
                defer.resolve();
            }).catch(function (error) {
                console.error("Error adding document: ", error);
                defer.reject();
            });
            return defer.promise;
        }

        service.deleteCompany = function (documentId) {
            var defer = $q.defer();
            var db = firebase.firestore();
            db.collection("Companies").doc(documentId).delete().then(function () {
                console.log("Document Deleted With Document Id" + documentId);
                defer.resolve();
            }).catch(function (error) {
                console.error("Error deleting document: ", error);
                defer.reject();
            });
            return defer.promise;
        }
        return service;
    }]);


});