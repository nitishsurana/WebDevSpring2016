/**
 * Created by Nitish on 3/24/2016.
 */

var fakeData = require("./user.mock.json");
var uuid = require('node-uuid');

module.exports = function(){
    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        findUserByUsername: findUserByUsername,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };

    return api;

    function findUserByUsername(searchText){
        for(var i=0; i<fakeData.length; i++){
            if (fakeData[i].username == searchText){
                return fakeData[i];
            }
        }
        return null;
    }

    function findUserByCredentials(username, password) {
        for(var i=0; i<fakeData.length; i++){
            if (fakeData[i].username == username && fakeData[i].password == password){
                return fakeData[i];
            }
        }
        return null;
    }

    function findAllUsers() {
        return fakeData;
    }

    function createUser (user) {
        var temp = {
            "_id": uuid.v1(),
            "fullName": user.fullName,
            "email": user.email,
            "username": user.username,
            "password": user.password,
            "phoneNumber": user.phoneNumber,
            "aboutMe": user.aboutMe,
            "interestedInvestments": user.interestedInvestments,
            "roles": user.roles
        };
        fakeData.push(temp);
        return fakeData;
    }

    function deleteUserById(userId) {
        fakeData = fakeData.filter(function (user) {
            return user._id !== userId;
        });
        return fakeData;
    }

    function updateUser(userId, user) {
        for (var i = 0; i < fakeData.length; i++) {
            if (fakeData[i]._id === userId) {
                fakeData[i] = user;
            }
        }
        return fakeData;
    }
};