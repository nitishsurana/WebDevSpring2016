/**
 * Created by Nitish on 3/17/2016.
 */
module.exports  = function(app, formModel){
    
    app.get("/api/assignment/user/:userId/form", findFormsByUser);
    app.get("/api/assignment/form/:formId", findFormByFormId);
    app.delete("/api/assignment/form/:formId", deleteFormByFormId);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormByFormId);

    function findFormsByUser(req, res) {
        var userId = req.params.userId;
        formModel.findAllFormsForUser(userId)
            .then(function (doc){
                res.json(doc);
            },function (err) {
                res.status(400).send(err);
            });
    }

    function findFormByFormId(req, res) {
        var formId = req.params.formId;
        formModel.findFormById(formId)
            .then(function (doc){
                res.json(doc);
            },function (err) {
                res.status(400).send(err);
            });
    }

    function deleteFormByFormId(req, res) {
        var formId = req.params.formId;
        formModel.deleteFormById(formId)
            .then(function (doc){
                res.json(doc);
            },function (err) {
                res.status(400).send(err);
            });
    }

    function createFormForUser(req, res) {
        var title = req.body;
        var userId = req.params.userId;
        formModel.createFormForUser(userId, title.title)
            .then(function (doc){
                res.json(doc);
            },function (err) {
                res.status(400).send(err);
            });
    }

    function updateFormByFormId(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        formModel.updateFormById(formId, form)
            .then(function (doc){
                res.json(doc);
            },function (err) {
                res.status(400).send(err);
            });
    }
};