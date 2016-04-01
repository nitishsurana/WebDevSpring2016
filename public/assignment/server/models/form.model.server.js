/**
 * Created by Nitish on 2/29/2016.
 */


module.exports = function (db, mongoose) {

    //var forms = require("./form.mock.json");
    //var uuid = require('node-uuid');
    var FormSchema = require('./form.schema.server.js')(mongoose);
    //var FieldSchema = require('./field.schema.server.js')(mongoose);
    var FormModel = mongoose.model('Form', FormSchema);

    var api = {
        createFormForUser: createFormForUser,
        findFormById:findFormById,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById
    };

    return api;



    function createFormForUser(userId,title) {
        var new_form = {
            "userId": userId,
            "title": title,
            "fields": []
        };
        var deferred = q.defer();
        FormModel.create(new_form, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise();
    }
/*
        forms.push(new_form);
        console.log(new_form);
        return forms;
  */

    function findFormById(formId){
        var deferred = q.defer();
        FormModel.findOne({_id: formId},function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise();/*
        var result = [];
        for (var i=0; i<forms.length; i++){
            if (forms[i]._id === formId){
                result.push(forms[i]);
            }
        }
        return result;*/
    }
    function findAllFormsForUser(userId){
        var deferred = q.defer();
        FormModel.find({userId: userId},function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise();/*
        var result = [];
        for (var i=0; i<forms.length; i++){
            if (forms[i].userId == userId){
                result.push(forms[i]);
            }
        }
        return result;*/
    }

    function deleteFormById(formId){
        var deferred = q.defer();
        FormModel.remove({_id: formId},function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise();/*
        for (var i = 0; i<forms.length; i++){
            if (forms[i]._id == formId){
                break;
            }
        }
        forms.splice(i,1);
        return forms;*/
    }

    function updateFormById(formId, newForm){
        var deferred = q.defer();
        FormModel.findOneAndUpdate({_id: formId},newForm, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise();/*
        for(var i = 0; i<forms.length; i++){
            if (forms[i]._id == formId){
                forms[i].title = newForm;
                break;
            }
        }
        return forms;*/
    }
};