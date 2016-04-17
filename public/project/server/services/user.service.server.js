/**
 * Created by Nitish on 3/24/2016.
 */

module.exports = function (app, userModel) {
    app.get("/api/project/admin", findAllUsers);
    app.get("/api/project/search/user", findUserByUsername);
    app.get("/api/project/user", findUserByCredentials);
    app.get("/api/project/userId", findUserById);
    app.get("/api/project/user/:userId/stock/:symbol", checkIfUserFollowStock);
    app.get("/api/project/user/:userId/investor/:username", checkIfUserFollowInvestor);
    app.post("/api/project/user", createUser);
    app.post("/api/project/user/:userId", followStock);
    app.post("/api/project/user/:userId/investor", followInvestor);
    app.delete("/api/project/user/:id", deleteUserById);
    app.put("/api/project/user/:id", updateUser);

    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel.findUserByUsername(username)
            .then(function (user) {
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
        var new_user = req.body;
        userModel.createUser(new_user)
            .then(function (user) {
                res.json(user);
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
};