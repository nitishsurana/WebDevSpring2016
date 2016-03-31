/**
 * Created by Nitish on 2/16/2016.
 */

//var fakeData = require("./user.mock.json");


module.exports = function (db, mongoose) {

    var uuid = require('node-uuid');
    var UserSchema = require('./user.schema.server.js')(mongoose);
    var q = require("q");
    var UserModel = mongoose.model('User', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername
    };

    return api;



    function findUserById(id){
        for(var i=0; i<fakeData.length; i++){
            if (fakeData[i]._id == id){
                return fakeData[i];
            }
        }
        return null;
    }

    function findUserByUsername(username){
        for(var i=0; i<fakeData.length; i++){
            if (fakeData[i].username == username){
                return fakeData[i];
            }
        }
        return null;
    }


    function findUserByCredentials(username, password) {
        console.log("User model");
        for(var i=0; i<fakeData.length; i++){
            if (fakeData[i].username == username && fakeData[i].password == password){
                return(fakeData[i]);
            }
        }
        return(null);
    }

    function findAllUsers() {
        return fakeData;
    }

    function createUser (user) {
        var temp = {
            "_id": uuid.v1(),
            "firstName": user.firstName,
            "lastName":  user.lastName,
            "username": user.username,
            "password": user.password
        };
        console.log(temp);
        //console.log(UserSchema);
        //console.log(UserModel);
        var deferred = q.defer();
        //console.log("Create User - server");
        //console.log(temp);
        //fakeData.push(temp);
        //console.log(deferred);
        UserModel.create(temp, function(err, doc){
            console.log(doc);
            console.log(err);
            if(err){
                deferred.reject(err);
            } else{
                deferred.resolve(doc);
            }

        });
        return deferred.promise;
    }

    function deleteUserById(id) {
        fakeData = fakeData.filter(function (user) {
            return user._id !== id;
        });
        return fakeData;
    }
/*
    function setCurrentUser(user){
        $rootScope.currentUser = user;
    }
    function getCurrentUser(){
        return $rootScope.currentUser;
    }*/
    function updateUser(id, user) {
        //console.log("Update User Model");
        //console.log(id);
        for (var i = 0; i < fakeData.length; i++) {
            console.log(fakeData[i]._id);
            console.log(fakeData[i]._id == id);
            if (fakeData[i]._id == id) {
                fakeData[i] = user;
                console.log(fakeData[i]);
            }
        }
        return fakeData;
    }
}

