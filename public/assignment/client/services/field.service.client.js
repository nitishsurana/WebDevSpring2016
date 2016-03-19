/**
 * Created by Nitish on 3/18/2016.
 */
(function () {

    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http){

        var api = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };

        return api;

        function createFieldForForm(formId, field){
            //console.log(t);
            return $http.post("/api/assignment/form/" + formId + "/form", field);
        }

        function getFieldsForForm(formId){
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function getFieldForForm(formId, fieldId) {
            
        }
        function deleteFieldFromForm(formId, fieldId){
            console.log(formId);
            return $http.delete("/api/assignment/form/" + formId);
        }

        function updateField(formId, fieldId, field){
            console.log(formId);
            console.log(newForm);
            return $http.put("/api/assignment/form/" + formId, newForm);
        }
    }
}) ();