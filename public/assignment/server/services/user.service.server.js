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
        user = userModel.createUser(user);
        //console.log('User Service Create User:' + user);
        res.json(user);
    }

    function allUsers(res) {
        var users = userModel.findAllUsers;
        //console.log('User Service:' + users);
        res.json(users);
    }

    function findUserById(req,res) {
        var id = req.params.id;
        var user = userModel.findUserById(id);
        //console.log("User Service" + user);
        if (user){
            res.json(user);
        }
        else{
            res.send(404);
        }
    }

    function findUserByUsername(req,res) {
        var username = req.body;
        var user = userModel.findUserByUsername(username);
        //console.log("User Service" + user);
        if (user){
            res.json(user);
        }
        else{
            res.send(404);
        }
    }

    function findUserByCredentials(req,res) {
        //console.log("Model user0 server");
        var username = req.query.username;
        var password = req.query.password;
        var user = userModel.findUserByCredentials(username, password);
        //console.log("User Service" + user);
        if (user){
            res.json(user);
        }
        else{
            res.send(404);
        }

    }

    function updateUserById(req, res) {
        var id = req.params.id;
        var user = req.body;
        //console.log("Before: ");
        //console.log(user);
        //console.log(id);
        var users = userModel.updateUser(id,user);
        //console.log("User Service" + users);
        //console.log(users);
        res.json(users);
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        var users = userModel.updateUser(id);
        //console.log("User Service" + users);
        res.json(users);
    }
}