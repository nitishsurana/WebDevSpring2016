/**
 * Created by Nitish on 2/29/2016.
 */
(function () {

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

    function createFormForUser(userId, title){
        var t = {
            title: title
        };
        console.log(t);
        return $http.post("/api/assignment/user/" + userId + "/form", t);
    }

    function findAllFormsForUser(userId){
        return $http.get("/api/assignment/user/" + userId + "/form");
    }

    function deleteFormById(formId){
        console.log(formId);
        return $http.delete("/api/assignment/form/" + formId);
    }

    function updateFormById(formId, newForm){
        console.log(formId);
        console.log(newForm);
        return $http.put("/api/assignment/form/" + formId, newForm);
    }
}
}) ();