/**
 * Created by Nitish on 2/29/2016.
 */


module.exports = function (db, mongoose) {

    var FormSchema = require('./form.schema.server.js')(mongoose);
    var FormModel = mongoose.model('Form', FormSchema);
    var q = require("q");

    var api = {
        createFormForUser: createFormForUser,
        findFormById:findFormById,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        sortField: sortField
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
        return deferred.promise;
    }

    function findFormById(formId){
        var deferred = q.defer();
        FormModel.findById(formId,function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
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
        return deferred.promise;
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
        return deferred.promise;
    }

    function updateFormById(formId, newForm){
        var deferred = q.defer();
        delete newForm._id;
        FormModel.findOneAndUpdate({_id: formId},newForm, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function sortField(formId, startIndex, endIndex){
        var deferred = q.defer();
        //console.log(startIndex, endIndex);
        FormModel.find({_id: formId}, function(err, doc){
            if(err){
                deferred.reject(err);
            }
            if (doc){
                var field =  doc[0].fields[startIndex];
                doc[0].fields.splice(startIndex, 1);
                doc[0].fields.splice(endIndex, 0, field);
                doc[0].markModified("fields");
                doc[0].save();
                FormModel.findOneAndUpdate({_id: formId}, doc[0], function(err, doc){
                    if(err){
                        deferred.reject(err);
                    } if (doc) {
                        deferred.resolve(doc);
                    }
                });
            }
        });
        return deferred.promise;
    }
};