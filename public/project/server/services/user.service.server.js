/**
 * Created by Nitish on 3/24/2016.
 */

module.exports = function(app,userModel){
    app.get("/api/project/admin", findAllUsers);
    app.get("/api/project/search/user", findUserByUsername);
    app.get("/api/project/user", findUserByCredentials);
    app.get("/api/project/userId", findUserById);
    app.post("/api/project/user", createUser);
    app.delete("/api/project/user/:id", deleteUserById);
    app.put("/api/project/user/:id", updateUser);

    function findUserByUsername(req, res){
        var username = req.query.username;
        userModel.findUserByUsername(username)
            .then(function(user){
                res.json(user);
            }, function(error){
                res.status(400).send(error);
            });
    }

    function findUserByCredentials(req, res){
        var username  = req.query.username;
        var password = req.query.password;
        //console.log("User Service server");
        //console.log(username, password);
        userModel.findUserByCredentials(username, password)
            .then(function(user){
                res.json(user);
            }, function(error){
                res.status(400).send(error);
            });
    }
    function findUserById(req, res){
        var userId = req.query.id;
        userModel.findUserById(userId)
            .then(function(user){
                res.json(user);
            }, function(error){
                res.status(400).send(error);
            });
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function(users){
                res.json(users);
            }, function(error){
                res.status(400).send(error);
            });
    }

    function createUser(req, res) {
        var new_user = req.body;
        console.log(new_user);
        userModel.createUser(new_user)
            .then(function(user){
                console.log(user);
                res.json(user);
            }, function(error){
                res.status(400).send(error);
            });
    }
    
    function deleteUserById(req, res){
        var id = req.params.id;
        console.log(id);
        userModel.deleteUserById(id)
            .then(function(user){
                res.json(user);
            }, function(error){
                res.status(400).send(error);
            });
    }
    
    function updateUser(req, res){
        var id = req.params.id;
        var user = req.body;
        userModel.updateUser(id, user)
            .then(function(user){
                res.json(user);
            }, function(error){
                res.status(400).send(error);
            });
    }

};