/**
 * Created by Nitish on 3/17/2016.
 */

module.exports = function(app, userModel){
    app.get("/api/assignment/loggedIn", loggedIn);
    app.get("/api/assignment/logout", logout);
    app.get("/api/assignment/user", findUserByCredentials);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user",  allUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user", findUserByUsername);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUser);

    function loggedIn(req, res){
        //console.log(req.session);
        res.send(req.session.currentUser);
    }

    function logout(req,res){
        req.session.destroy();
        res.send(200);
    }
    function createUser (req, res) {
        var user = req.body;
        //console.log("Create user - services server");
        //console.log(user);
        userModel.createUser(user)
            .then(
                function (doc){
                    //console.log(doc);
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                });
        //console.log('User Service Create User:' + user);

    }

    function allUsers(res) {
        userModel.findAllUsers
            .then(
                function (doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                });
        //console.log('User Service:' + users);
        //res.json(users);
    }

    function findUserById(req,res) {
        var id = req.params.id;
        userModel.findUserById(id)
            .then(
                function (doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                });
        /*console.log("User Service" + user);
        if (user){
            res.json(user);
        }
        else{
            res.send(404);
        }*/
    }

    function findUserByUsername(req,res) {
        var username = req.body;
        userModel.findUserByUsername(username)
            .then(
                function (doc){
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                });
        /*console.log("User Service" + user);
        if (user){
            res.json(user);
        }
        else{
            res.send(404);
        }*/
    }

    function findUserByCredentials(req,res) {
        //console.log("Model user0 server");
        var username = req.query.username;
        var password = req.query.password;
        userModel.findUserByCredentials(username, password)
            .then(
                function (doc){
                    //console.log("sucess");
                    //console.log(doc);
                    //console.log("Before assigning session");
                    //console.log(req);
                    //console.log(req.session);
                    //req.session = {};
                    //console.log(req.session);
                    //console.log(req.session.currentUser);
                    req.session.currentUser = doc;
                    //console.log("After assigning session");
                    //console.log("session: ", req.session.currentUser);
                    res.json(doc);
                },
                function(err){
                    //console.log(err);
                    res.status(400).send(err);
                });
        /*console.log("User Service" + user);
        if (user){
            res.json(user);
        }
        else{
            res.send(404);
        }*/

    }

    function updateUserById(req, res) {
        var id = req.params.id;
        var user = req.body;
        //console.log("Before: ");
        //console.log(user);
        //console.log(id);
        userModel.updateUser(id,user)
            .then(
                function (doc){
                    req.session.currentUser = user;
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                });
        //console.log("User Service" + users);
        //console.log(users);
        //res.json(users);
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        userModel.updateUser(id)
            .then(
                function (doc){
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);
                });
        //console.log("User Service" + users);
        //res.json(users);
    }
};