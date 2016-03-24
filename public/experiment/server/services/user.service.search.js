/**
 * Created by Nitish on 3/24/2016.
 */

module.exports = function(app,userModel){
    app.get("/api/project/user?username=username", findUserByUsername);
    app.get("/api/project/user?username=username&password=password", findUserByCredentials);
    app.get("/api/project/user", findAllUsers);
    app.post("/api/project/user", createUser);
    app.delete("/api/project/user/:id", deleteUserById);
    app.put("/api/project/user/:id", updateUser);

    function findUserByUsername(req, res){
        var username = req.params.username;
        var result = userModel.findUserByUsername(username);
        res.send(result);
    }

    function findUserByCredentials(req, res){
        var username  = req.params.username;
        var password = req.params.password;
        var result = userModel.findUserByCredentials(username, password);
        res.send(result);
    }

    function findAllUsers(req, res) {
        var result = userModel.findAllUsers;
        res.json(result);
    }

    function createUser(req, res) {
        var new_user = req.body;
        var result = userModel.createUser(new_user);
        res.json(result);
    }
    
    function deleteUserById(req, res){
        var id = req.params.id;
        var result = userModel.deleteUserById(id);
        res.json(result);
    }
    
    function updateUser(req, res){
        var id = req.params.id;
        var user = req.body;
        var result = userModel.updateUser(id, user);
        res.json(result);
    }

    function setCurrentUser(user){
        $rootScope.currentUser = user;
    }
    function getCurrentUser(){
        return $rootScope.currentUser;
    }
};