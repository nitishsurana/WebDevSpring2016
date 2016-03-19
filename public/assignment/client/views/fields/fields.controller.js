/**
 * Created by Nitish on 3/18/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService) {
        var a = this;

        a.removeField = removeField;
        toRender();
        function toRender(){
            FieldService.getFieldsForForm($routeParams.formId)
                .then(function (response){
                    a.fields = response.data;
                    console.log(a.fields);
                });

        }

        function removeField(fieldId) {
            console.log(fieldId);
            FieldService.deleteFieldFromForm($routeParams.formId, fieldId)
                .then(function(response){
                    a.fields = response.data;
                    console.log(a.fields);
                })
        }
    }
}) ();