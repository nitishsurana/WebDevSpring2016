/**
 * Created by Nitish on 3/24/2016.
 */

module.exports = function (app, userModel) {

    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    var auth = function(req, res, next){
        if(!req.isAuthenticated()){
            res.send(401);
        } else {
            next();
        }
    };

    app.get("/api/project/loggedin", loggedIn);
    app.get("/api/project/logout", logOut);
    app.get("/api/project/admin", findAllUsers);
    app.get("/api/project/search/user", findUserByUsername);
    app.get("/api/project/user", findUserByCredentials);
    app.get("/api/project/userId", findUserById);
    app.get("/api/project/user/:userId/stock/:symbol", checkIfUserFollowStock);
    app.get("/api/project/user/:userId/investor/:username", checkIfUserFollowInvestor);
    app.get("/api/project/user/:username/stock", stocksFollowedByUser);
    app.post("/api/project/user/login", passport.authenticate('local'), login);
    app.post("/api/project/user", createUser);
    app.post("/api/project/user/:userId/stock", followStock);
    app.post("/api/project/user/:userId/investor", followInvestor);
    app.delete("/api/project/user/:id", deleteUserById);
    app.put("/api/project/user/:id", updateUser);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done){
        userModel.findUserByUsername(username)
            .then(function(user){
                if(user && bcrypt.compareSync(password, user[0].password)){
                    return done(null, user[0]);
                } else {
                    return done(null, false);
                }
            }, function(error){
                return done(error);
            });
    }

    function serializeUser(user, done){
        done(null, user);
    }

    function deserializeUser(user, done){
        userModel.findUserById(user._id)
            .then(function(response){
                return done(null, response);
            }, function(error){
                done(error, null);
            });
    }

    function login(req, res){
        var user = req.user;
        res.json(user);
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated()? req.user: '0');
    }

    function logOut(req, res) {
        req.logOut();
        res.send(200);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel.findUserByUsername(username)
            .then(function (user) {
                req.session.user = user;
                res.json(user);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        userModel.findUserByCredentials(username, password)
            .then(function (user) {
                req.session.user = user;
                res.json(user);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function findUserById(req, res) {
        var userId = req.query.id;
        userModel.findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.json(users);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function createUser(req, res) {
        var newUser = req.body;
        userModel.findUserByUsername(newUser.username)
            .then(function (response) {
                if(response.length == 0) {
                    newUser.password = bcrypt.hashSync(newUser.password);
                    userModel.createUser(newUser)
                        .then(function(user){
                            req.session.user = user;
                            res.json(user);
                        }, function(error){
                            res.status(400).send(error);
                        });
                }
                else {
                    res.status(401).send("Username already exists!");
                }
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function deleteUserById(req, res) {
        var id = req.params.id;
        userModel.deleteUserById(id)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;
        userModel.updateUser(id, user)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function followStock(req, res) {
        var userId = req.params.userId;
        var stock = req.body;
        userModel.followStock(userId, stock)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function checkIfUserFollowStock(req, res) {
        var userId = req.params.userId;
        var symbol = req.params.symbol;
        userModel.findUserById(userId)
            .then(function (response) {
                for (var i = 0; i < response.followStocks.length; i++) {
                    if (response.followStocks[i].symbol == symbol) {
                        res.send(true);
                    }
                }
                res.send(false);
            }, function (error) {
                res.status(400).send(error);
            })
    }

    function followInvestor(req, res) {
        var userId = req.params.userId;
        var investor = req.body;
        userModel.followInvestor(userId, investor)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.status(400).send(error);
            })
    }

    function checkIfUserFollowInvestor(req, res) {
        var userId = req.params.userId;
        var username = req.params.username;
        userModel.findUserById(userId)
            .then(function (response) {
                for (var i = 0; i < response.followUsers.length; i++) {
                    if (response.followUsers[i].username == username) {
                        res.send(true);
                    }
                }
                res.send(false);
            }, function (error) {
                res.status(400).send(error);
            })
    }
    
    function stocksFollowedByUser(req, res) {
        var username = req.params.username;
        userModel.findUserByUsername(username)
            .then(function(response){
                res.json(response);
            }, function(error){
                res.status(400).send(error);
            })
    }
};