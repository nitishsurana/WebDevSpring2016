/**
 * Created by Nitish on 3/17/2016.
 */

module.exports = function (app, userModel) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    var bcrypt = require('bcrypt-nodejs');
    /*var auth = function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };*/

    app.get("/api/assignment/loggedIn", loggedIn);
    app.get("/api/assignment/logout", logout);
    app.get("/api/assignment/user", findUserByCredentials);
    app.post("/api/assignment/user", createUser);
    //app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.get("/api/assignment/admin/user", isAdmin, findAllUsers);
    app.get("/api/assignment/admin/user/:id", isAdmin, findUserById);
    app.get("/api/assignment/user", findUserByUsername);
    app.put("/api/assignment/user/:id", updateUserById);

    app.delete("/api/assignment/admin/user/:id", isAdmin, deleteUser);
    app.post("/api/assignment/admin/user", isAdmin, adminCreateUser);
    app.put("/api/assignment/admin/user/:userId", isAdmin, adminUpdateUser);
/*
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel.findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else  {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel.findUserById(user._id)
            .then(function (user) {
                done(null, user);
            }, function (err) {
                done(err, null);
            });
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }
*/
    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function createUser(req, res) {
        var user = req.body;
        user.roles = ['student'];
        user.password = bcrypt.hashSync(user.password);
        userModel.findUserByUsername(user.username)
            .then(function (response){
                if (response){
                    res.json(null);
                } else {
                    userModel.createUser(user)
                        .then( function(user){
                            if(user){
                                req.login(user, function(err){
                                    if(err){
                                        res.status(400).send(err);
                                    } else {
                                        res.json(user);
                                    }
                                })
                            }
                        });
                }
            });
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findUserById(req, res) {
        var id = req.params.id;
        userModel.findUserById(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findUserByUsername(req, res) {
        var username = req.body;
        userModel.findUserByUsername(username)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        userModel.findUserByCredentials(username, password)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function updateUserById(req, res) {
        var id = req.params.id;
        var user = req.body;
        userModel.updateUser(id, user)
            .then(
                function (doc) {
                    req.session.currentUser = user;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        userModel.deleteUserById(id)
            .then(function (doc) {
                    userModel.findAllUsers()
                        .then(
                            function (response) {
                                res.json(response);
                            },
                            function (err) {
                                res.status(400).send(err);
                            });
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function adminCreateUser(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        console.log(user.roles);
        if (user.roles[0].indexOf(",") > 0){
            user.roles = user.roles[0].split(",");
        } else {
            user.roles = ["student"];
        }
        userModel.createUser(user)
            .then(
                function (doc) {
                    userModel.findAllUsers()
                        .then(
                            function (doc) {
                                res.json(doc);
                            },
                            function (err) {
                                res.status(400).send(err);
                            });
                    //res.json();
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function adminUpdateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        userModel.updateUser(userId, user)
            .then(
                function (doc) {
                    userModel.findAllUsers()
                        .then(
                            function (doc) {
                                res.json(doc);
                            },
                            function (err) {
                                res.status(400).send(err);
                            });
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function isAdmin(req, res, next) {
        if (req.user.roles.indexOf('admin') >= 0) {
            next();
        }
        else {
            res.send(403);
        }
    }
};