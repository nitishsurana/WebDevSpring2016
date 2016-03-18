/**
 * Created by Nitish on 2/29/2016.
 */
angular
    .module("FormBuilderApp")
    .factory("FormService", FormService);

function FormService(){
    "user strict";
    var forms = [];
    forms = [
        {"_id": "000", "title": "Contacts", "userId": 123},
        {"_id": "010", "title": "ToDo",     "userId": 123},
        {"_id": "020", "title": "CDs",      "userId": 234}
    ];

    var api = {
        createFormForUser: createFormForUser,
        findFormById:findFormById,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        forms: forms
    };

    return api;

    function createFormForUser(userId, form){
        var new_form ={
            "_id": (new Date()).getTime(),
            "title": form,
            "userId": userId
        };
        forms.push(new_form);
        return new_form;
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
            if (forms[i]._id === userId){
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
        return forms[i];
    }
}