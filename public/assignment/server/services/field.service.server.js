/**
 * Created by Nitish on 3/17/2016.
 */

module.exports = function (app, formModel, fieldModel) {
    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);
    app.put("/api/assignment/:formId/field", updateFields);

    function findFieldsByFormId(req, res) {
        var formId = req.params.formId;
        formModel.findFormById(formId)
            .then(function (doc) {
                res.json(doc);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findFieldById(req, res) {
        var fieldId = req.params.fieldId;
        fieldModel.findFieldById(fieldId)
            .then(function (err, doc) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.json(doc);
                }
            });
    }

    function deleteFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel.findFormById(formId)
            .then(function (doc) {
                var index = -1;
                for(var i = 0;i <doc.fields.length; i++){
                    if (doc.fields[i]._id == fieldId){
                        index = i;
                        break;
                    }
                }
                doc.fields.splice(index, 1);
                formModel.updateFormById(formId, doc)
                    .then(function(doc){
                        res.json(doc);
                    }, function(err){
                        res.status(400).send(err);
                    });
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function createField(req, res) {
        var fields = req.body;
        var formId = req.params.formId;
        formModel.findFormById(formId)
            .then(function (doc) {
                doc.fields.push(fields);
                delete doc._id;
                console.log(doc);
                for(var i=0;  i<doc.fields.length; i++){
                    delete doc.fields[i]._id;
                }
                formModel.updateFormById(formId, doc)
                    .then(function (doc) {
                        res.json(doc);
                    }, function (err) {
                        res.status(400).send(err);
                    });
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function updateFieldById(req, res) {
        var fieldId = req.params.fieldId;
        var updatedFields = req.body;
        fieldModel.updateFieldById(fieldId, updatedFields)
            .then(function (err) {
                res.status(400).send(err);
            }, function (doc) {
                res.json(doc);
            });
    }

    function updateFields(req, res){
        var formId = req.params.formId;
        var startIndex = req.query.startIndex;
        var endIndex = req.query.endIndex;

        if(startIndex && endIndex){
            formModel.sortField(formId, startIndex, endIndex)
                .then(function (response){
                    res.json(200);
                }, function(err){
                    res.status(400).send(err);
                });
        }
    }
};