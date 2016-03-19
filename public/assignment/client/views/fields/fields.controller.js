/**
 * Created by Nitish on 3/18/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController($routeParams, FieldService) {
        var a = this;

        toRender();
        function toRender(){
            FieldService.getFieldsForForm($routeParams.formId)
                .then(function (response){
                    a.fields = response.data;
                    console.log(a.fields);
                });
            
        }
    }
}) ();