/**
 * Created by Nitish on 4/1/2016.
 */

module.exports = function (db , mongoose) {

    var fieldSchema = require("./field.schema.server.js")(mongoose);
    var fieldModel = mongoose.model('fields', fieldSchema);
    var q = require('q');

    var api = {
        
        findFieldById: findFieldById,
        deleteFieldById: deleteFieldById,
        createField: createField,
        updateFieldById: updateFieldById
        //sortField: sortField
    };

    return api;

    function findFieldById(fieldId) {
        var deferred = q.defer();
        fieldModel.findOne({_id: fieldId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
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
        return deferred.promise;
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
        return deferred.promise;
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
        return deferred.promise;
    }

    
};