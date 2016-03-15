/**
 * Created by Nitish on 3/15/2016.
 */
(function (){
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService(){


        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            findFormByTitle: findFormByTitle,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return api;

        function createFormForUser(userId, form, callback){
            var new_form ={
                "_id": (new Date()).getTime(),
                "title": form,
                "userId": userId
            };
            forms.push(new_form);
            callback(new_form);
        }

        function findAllFormsForUser(userId, callback){
            var result = [];
            for (var i=0; i<forms.length; i++){
                if (forms[i]._id === userId){
                    result.push(forms[i]);
                }
            }
            callback(result);
        }

        function findFormByTitle(title){
            for (var i=0; i<forms.length; i++){
                if (forms[i].title === title){
                    return forms[i];
                }
            }
            return null;
        }

        function deleteFormById(formId, callback){
            for (var i = 0; i<forms.length; i++){
                if (forms[i]._id == formId){
                    break;
                }
            }
            forms.splice(i,1);
            callback(forms);
        }

        function updateFormById(formId, newForm, callback){
            for(var i = 0; i<forms.length; i++){
                if (forms[i]._id == formId){
                    forms[i].title = newForm;
                    break;
                }
            }
            callback(forms[i]);
        }
    }
}) ();