/**
 * Created by Nitish on 2/29/2016.
 */
angular
    .module("FormBuilderApp")
    .factory("FormService", FormService);

function FormService($http){

    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById
    };

    return api;

    function createFormForUser(userId, form){
        var new_form ={
            "_id": (new Date()).getTime(),
            "title": form,
            "userId": userId
        };
        return $http.post("/api/assignment/user/" + userId + "/form", new_form);
    }

    function findAllFormsForUser(userId){
        return $http.get("/api/assignment/user/" + userId + "/form");
    }

    function deleteFormById(formId){
        return $http.get("/api/assignment//form/" + formId);
    }

    function updateFormById(formId, newForm){
        return $http.get("/api/assignment/form/" + formId, newForm);
    }
}