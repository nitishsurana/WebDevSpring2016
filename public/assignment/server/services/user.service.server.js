/**
 * Created by Nitish on 3/17/2016.
 */

module.exports = function(app, userModel){

    app.get("/api/assignment/user", findUserByCredentials);
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user",  allUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user", findUserByUsername);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser (req, res) {
        var user = req.body;
        console.log("Create user - services server");
        console.log(user);
        userModel.createUser(user)
            .then(
                function (doc){
                    console.log(doc);
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

    function updateUserById(req, res) {
        var id = req.params.id;
        var user = req.body;
        //console.log("Before: ");
        //console.log(user);
        //console.log(id);
        userModel.updateUser(id,user)
            .then(
                function (doc){
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