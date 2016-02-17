/**
 * Created by Nitish on 2/16/2016.
 */
var app = angular.module("FormBuilderApp", []);
app.factory('UserService', function userService() {
    "use strict";
    var userService = {};
    var fakeData = [];
    fakeData = [
        {"_id": 123, "firstName": "Alice", "lastName": "Wonderland", "username": "alice", "password": "alice"},
        {"_id": 234, "firstName": "Bob", "lastName": "Hope", "username": "bob", "password": "bob"},
        {"_id": 345, "firstName": "Charlie", "lastName": "Brown", "username": "charlie", "password": "charlie"},
        {"_id": 456, "firstName": "Dan", "lastName": "Craig", "username": "dan", "password": "dan"},
        {"_id": 567, "firstName": "Edward", "lastName": "Norton", "username": "ed", "password": "ed"}
    ];
    userService.findUserByUsernameAndPassword = function (username, password, callback) {
        fakeData.forEach(function (user) {
            if (user.username === username) {
                if (user.password === password) {
                    callback(user);
                }
            }
        });
        callback(null);
    }

    userService.findAllUsers = function (callback) {
        callback(fakeData);
    }

    userService.createUser = function (user, callback) {
        var temp = ('{"_id":' + (new Date()).getTime() + ', "firstName":' + user.firstName + ', "lastName":' + user.lastName + ', "username":' + user.username + ', "password":' + user.password + '}');
        fakeData.push(temp);
        console.log(temp);
        callback(user);
    }

    userService.deleteUserById = function (userId, callback) {
        fakeData = fakeData.filter(function (user) {
            return user.username !== userId;
        });
        callback(fakeData);
    }

    userService.updateUser = function (userId, user, callback) {
        for (var i = 0; i < fakeData.length; i++) {
            if (fakeData[i].username === userId) {
                fakeData[i] = user;
            }
        }
        callback(fakeData);
    }

    /*
     function updateUser(userId, user, callback) {
     fakeData.forEach(function (users) {
     if (users.username === userId) {
     users = user;
     }
     });
     callback(fakeData);
     }
     */
    return userService;
});

