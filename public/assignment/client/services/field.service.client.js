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
            //console.log(field);
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function getFieldsForForm(formId){
            //console.log("fields service client: ", formId);
            return $http.get("/api/assignment/form/" + formId + "/field");
        }

        function getFieldForForm(formId, fieldId) {
            
        }
        function deleteFieldFromForm(formId, fieldId){
            //console.log(formId, fieldId);
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function updateField(formId, fieldId, field){
            //console.log(formId);
            //console.log(newForm);
            return $http.put("/api/assignment/form/" + formId, newForm);
        }
    }
}) ();