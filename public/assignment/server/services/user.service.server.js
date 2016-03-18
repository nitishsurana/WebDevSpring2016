/**
 * Created by Nitish on 3/17/2016.
 */

module.exports = function(app, userModel){
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user",  allUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=alice&password=alice", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUser);

    function createUser (req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        console.log('User Service:' + user);
        res.send(200);
    }

    function allUsers(res) {
        var users = userModel.findAllUsers;
        console.log('User Service:' + users);
        res.json(users);
    }

    function findUserById(req,res) {
        var id = req.params.id;
        var user = userModel.findUserById(id);
        console.log("User Service" + user);
        if (user){
            res.json(user);
        }
        res.send(404);
    }

    function findUserByUsername(req,res) {
        var username = req.body;
        var user = userModel.findUserByUsername(username);
        console.log("User Service" + user);
        if (user){
            res.json(user);
        }
        res.send(404);
    }

    function findUserByCredentials(req,res) {
        var userCredentials = req.body;
        var user = userModel.findUserByCredentials(userCredentials);
        console.log("User Service" + user);
        if (user){
            res.json(user);
        }
        res.send(404);
    }

    function updateUserById(req, res) {
        var id = req.params.id;
        var user = req.body;
        var users = userModel.updateUser(id,user);
        console.log("User Service" + users);
        res.json(users);
    }

    function deleteUser(req, res) {
        var id = req.params.id;
        var users = userModel.updateUser(id);
        console.log("User Service" + users);
        res.json(users);
    }
}