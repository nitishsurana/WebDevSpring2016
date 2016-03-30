/**
 * Created by Nitish on 2/29/2016.
 */

var forms = require("./form.mock.json");
var uuid = require('node-uuid');
var FormSchema = require('./form.schema.server.js');
var FieldSchema = require('./field.schema.server');
var FormModel = mongoose.model('Form', FormSchema);

module.exports = function (db, mongoose) {

    var api = {
        createFormForUser: createFormForUser,
        findFormById:findFormById,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById
    };

    return api;

    function createFormForUser(userId, title){
        var new_form ={
            "_id": uuid.v1(),
            "title": title,
            "userId": userId
        };
        forms.push(new_form);
        console.log(new_form);
        return forms;
    }

    function findFormById(formId){
        var result = [];
        for (var i=0; i<forms.length; i++){
            if (forms[i]._id === formId){
                result.push(forms[i]);
            }
        }
        return result;
    }
    function findAllFormsForUser(userId){
        var result = [];
        for (var i=0; i<forms.length; i++){
            if (forms[i].userId == userId){
                result.push(forms[i]);
            }
        }
        return result;
    }

    function deleteFormById(formId){
        for (var i = 0; i<forms.length; i++){
            if (forms[i]._id == formId){
                break;
            }
        }
        forms.splice(i,1);
        return forms;
    }

    function updateFormById(formId, newForm){
        for(var i = 0; i<forms.length; i++){
            if (forms[i]._id == formId){
                forms[i].title = newForm;
                break;
            }
        }
        return forms;
    }
}