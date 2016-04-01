/**
 * Created by Nitish on 4/1/2016.
 */
module.exports = function (db , mongoose) {

    var fieldSchema = require("./field.schema.server.js")(mongoose);
    var fieldModel = mongoose.model('fields', fieldSchema);

    var api = {
        
        findFieldById: findFieldById,
        deleteFieldById: deleteFieldById,
        createField: createField,
        updateFieldById: updateFieldById
    };

    return api;

/*    function findFieldsByFormId(formId){
        var deferred = q.defer();
        fieldModel.findFormById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise();/*
        var formId = req.params.formId;
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
        return null;
    }*/

    function findFieldById(fieldId) {
        var deferred = q.defer();
        fieldModel.findOne({_id: fieldId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise();/*
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
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

    function deleteFieldById(fieldId) {
        var deferred = q.defer();
        fieldModel.remove({_id: fieldId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise();/*
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
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

    function createField(fields) {
        var deferred = q.defer();
        fieldModel.create(fields, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise();/*
        var field = req.body;
        var formId = req.params.formId;
        field._id = uuid.v1();
        for(var i = 0; i<forms.length ; i++){
            if (forms[i]._id == formId){
                forms[i].fields.push(field);
            }
        }
        res.send(forms);*/
    }

    function updateFieldById(fieldId, fields) {
        var deferred = q.defer();
        fieldModel.findOneAndUpdate({_id: fieldId}, fields, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise();/*
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var updatedForm = req.body;
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