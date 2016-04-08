/**
 * Created by Nitish on 3/18/2016.
 */
(function () {

    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {

        var api = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField,
            sortPage: sortPage
        };

        return api;

        function createFieldForForm(formId, field) {
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function getFieldsForForm(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field");
        }


        function deleteFieldFromForm(formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function updateField(formId) {
            return $http.put("/api/assignment/form/" + formId, newForm);
        }

        function sortPage(formId, startIndex, endIndex){
            return $http.put("/api/assignment/"+formId+"/field?startIndex="+startIndex+"&endIndex="+endIndex);
        }
    }
})();