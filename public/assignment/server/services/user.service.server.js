/**
 * Created by Nitish on 3/17/2016.
 */

module.exports = function (app, userModel) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;

    var auth= function(req, res, next){
        if(!req.isAuthenticated()){
            res.send(401);
        } else {
            next();
        }
    };

    app.get("/api/assignment/loggedIn", loggedIn);
    app.get("/api/assignment/logout", logout);
    app.get("/api/assignment/user", findUserByCredentials);
    app.post("/api/assignment/user", createUser);
    app.post("/api/assignment/login", passport.authenticate('local'), login);
    app.get("/api/assignment/user", allUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user", findUserByUsername);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUser);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done){
        userModel.findUserByCredentials(username, password)
            .then(
                function(user){
                    if(!user){
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err){
                    if (err) {
                        return done(err);
                    }
                });
    }

    function serializeUser(user, done){
        done(null, user);
    }

    function deserializeUser(user, done){
        userModel.findUserById(user._id)
            .then(function(user){
                done(null, user);
            }, function(err){
                done(err, null);
            });
    }

    function login(req, res){
        var user = req.user;
        res.json(user);
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated()? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function createUser(req, res) {
        var user = req.body;
        user.roles = ['student'];
        userModel.createUser(user)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }

    function allUsers(res) {
        userModel.findAllUsers
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
        userModel.updateUser(id)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
    }
};