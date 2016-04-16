/**
 * Created by Nitish on 3/24/2016.
 */

module.exports = function(db, mongoose){

    var UserSchema = require('./user.schema.server.js')(mongoose);
    var q = require("q");
    var UserModel = mongoose.model('user', UserSchema);
    
    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        followStock: followStock
    };

    return api;

    function findUserByUsername(searchText){
        var deferred = q.defer();
        UserModel.find({username: searchText}, function(err, doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        UserModel.findOne({username: username, password: password}, function(err, doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findOne({_id: userId}, function(err, doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find({}, function(err, doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function createUser (user) {
        user.followUsers = [];
        user.followStocks = [];
        console.log("model: ", user);
        var deferred = q.defer();
        UserModel.create(user, function(err, doc){
            if(err){
                console.log(err);
                deferred.reject(err);
            } else {
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        UserModel.remove({_id: userId}, function(err, doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        UserModel.findOneAndUpdate({_id: userId}, user, function(err, doc){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function followStock(userId, stock) {
        var deferred = q.defer();
        var flag = 1;
        UserModel.find({_id: userId}, function(err, investor){
            if (err){
                deferred.reject(err);
            }
            if (investor){
                //console.log(investor[0].followStocks);
                for(var i = 0; i< investor[0].followStocks.length ; i++){
                    if (investor[0].followStocks[i].symbol == stock.symbol){
                        flag = 0;
                        break;
                    }
                }
                if(flag == 1){
                    investor[0].followStocks.push(stock);
                    //console.log(investor[0].followStocks);
                }
                else if(flag == 0){
                    investor[0].followStocks.splice(i, 1);
                }

                UserModel.update({_id: userId}, investor[0], function(err, doc){
                    if (err){
                        deferred.reject(err);
                    }
                    if (doc){
                        //console.log(doc);
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }
};