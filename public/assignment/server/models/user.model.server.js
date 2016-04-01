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



    function findUserById(userId){
        var deferred = q.defer();
        UserModel.findUserById({_id: userId}, function(err ,doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
        /*
        for(var i=0; i<fakeData.length; i++){
            if (fakeData[i]._id == id){
                return fakeData[i];
            }
        }
        return null;*/
    }

    function findUserByUsername(username){
        var deferred = q.defer();
        UserModel.findOne({username: username}, function(err ,doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
        /*
        for(var i=0; i<fakeData.length; i++){
            if (fakeData[i].username == username){
                return fakeData[i];
            }
        }
        return null;*/
    }


    function findUserByCredentials(username, password) {
        console.log("User model");
        var deferred = q.defer();
        UserModel.findOne({username: username, password: password}, function(err ,doc){
            console.log(doc);
            console.log(err);
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        console.log("returns");
        return deferred.promise;
        console.log("does not reach");
        /*
        for(var i=0; i<fakeData.length; i++){
            if (fakeData[i].username == username && fakeData[i].password == password){
                return(fakeData[i]);
            }
        }
        return(null);*/
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find({}, function(err ,doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
        //return fakeData;
    }

    function createUser (user) {
        var temp = {
            "firstName": user.firstName,
            "lastName":  user.lastName,
            "username": user.username,
            "password": user.password,
            "emails": user.emails,
            "phones": []
        };
        //console.log(temp);
        //console.log(UserSchema);
        //console.log(UserModel);
        var deferred = q.defer();
        //console.log("Create User - server");
        //console.log(temp);
        //fakeData.push(temp);
        //console.log(deferred);
        UserModel.create(temp, function(err, doc){
            //console.log(doc);
            //console.log(err);
            if(err){
                deferred.reject(err);
            } else{
                deferred.resolve(doc);
            }

        });
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        UserModel.remove({_id: userId}, function(err ,doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;/*
        fakeData = fakeData.filter(function (user) {
            return user._id !== id;
        });
        return fakeData;*/
    }
/*
    function setCurrentUser(user){
        $rootScope.currentUser = user;
    }
    function getCurrentUser(){
        return $rootScope.currentUser;
    }*/
    function updateUser(userId, user) {
        //console.log("Update User Model");
        //console.log(id);
        var deferred = q.defer();
        UserModel.findOneAndUpdate({_id: userId}, user, function(err ,doc){
            if(err){
                deferred.reject(err);
            }else{
                
                deferred.resolve(doc);
            }
        });
        return deferred.promise;/*
        for (var i = 0; i < fakeData.length; i++) {
            console.log(fakeData[i]._id);
            console.log(fakeData[i]._id == id);
            if (fakeData[i]._id == id) {
                fakeData[i] = user;
                console.log(fakeData[i]);
            }
        }
        return fakeData;*/
    }
};

