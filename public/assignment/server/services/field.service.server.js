/**
 * Created by Nitish on 3/17/2016.
 */

//var forms = require("../models/form.mock.json");
//var uuid = require('node-uuid');

module.exports = function (app, formModel, fieldModel) {
    app.get("/api/assignment/form/:formId/field", findFieldsByFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", createField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);

    //var formService = require("./form.service.server.js");


    function findFieldsByFormId(req, res) {
        var formId = req.params.formId;
        //console.log("Fields server service - find by form Id");
        formModel.findFormById(formId)
            .then(function (doc) {
                res.json(doc);
            }, function (err) {
                //console.log(err);
                res.status(400).send(err);
            });
        /*
         var selectedFields = [];
         console.log("Fields service server");
         console.log(formId);
         for(var i = 0; i<forms.length ; i++){
         console.log(forms[i]._id);
         if (forms[i]._id == formId){
         selectedFields = forms[i].fields;
         console.log(selectedFields);
         res.send(selectedFields);
         }
         }
         return null;*/
    }

    function findFieldById(req, res) {
        //var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.findFieldById(fieldId)
            .then(function (err, doc) {
                if (err) {
                    res.status(400).send(err);
                } else {
                    res.json(doc);
                }
            });
        /*
         var selectedFields = [];
         for(var i = 0; i<forms.length ; i++){
         if (forms[i]._id == formId){
         for (var j = 0 ; j < forms[i].fields.length ; j++){
         if (forms[i].fields[j]._id == fieldId){
         selectedFields = forms[i].fields[j];
         console.log(selectedFields);
         return selectedFields;
         }
         }

         }
         }
         return null;*/
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
                        //console.log(doc.fields);
                        res.json(doc);
                    }, function(err){
                        res.status(400).send(err);
                    });
                //res.json(doc);
            }, function (err) {
                res.status(400).send(err);
            });
        /*
         for(var i = 0; i<forms.length ; i++){
         if (forms[i]._id == formId){
         for (var j = 0 ; j < forms[i].fields.length ; j++){
         if (forms[i].fields[j]._id == fieldId){
         break;
         }
         }
         forms[i].fields.splice(j,1);
         res.send(forms[i].fields);
         }
         }*/
    }

    function createField(req, res) {
        var fields = req.body;
        var formId = req.params.formId;
        //console.log("Field Service server:");
        //console.log(fields);
        formModel.findFormById(formId)
            .then(function (doc) {
                doc.fields.push(fields);
                formModel.updateFormById(formId, doc)
                    .then(function (doc) {
                        //console.log(doc);
                        res.json(doc);
                    }, function (err) {
                        res.status(400).send(err);
                    });
                //console.log(doc);
                //res.json(doc);
            }, function (err) {
                res.status(400).send(err);
            });
        /*
         field._id = uuid.v1();
         for(var i = 0; i<forms.length ; i++){
         if (forms[i]._id == formId){
         forms[i].fields.push(field);
         }
         }
         res.send(forms);*/
    }

    function updateFieldById(req, res) {
        //var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedFields = req.body;
        fieldModel.updateFieldById(fieldId, updatedFields)
            .then(function (err) {
                res.status(400).send(err);
            }, function (doc) {
                res.json(doc);
            });
        /*
         for(var i = 0; i<forms.length ; i++){
         if (forms[i]._id == formId){
         for (var j = 0 ; j < forms[i].fields.length ; j++){
         if (forms[i].fields[j]._id == fieldId){
         forms[i].fields[j] = updatedForm;
         break;
         }
         }
         }
         }
         res.send(forms[i].fields);*/
    }
};