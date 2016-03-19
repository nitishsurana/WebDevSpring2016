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
        a.addField = addField;

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
                    //console.log(a.fields);
                })
        }

        function addField(type) {
            var newField = {
                _id: null,
                label: "",
                type: type,
                placeholder: ""
            };
            if (type == "TEXT"){
                newField.label = "New Text Field";
                newField.placeholder = "New Field";
            }
            else if(type == "TEXTAREA"){
                newField.label = "New Text Field";
                newField.placeholder = "New Field";
            }
            else if(type == "DATE"){
                newField.label = "New Date Field";
            }
            else if(type == "OPTIONS"){
                newField.label = "New Dropdown";
                newField.options = [];
            }
            else if(type == "CHEKBOXES"){
                newField.label = "New Checkboxes";
                newField.options = [];
            }
            else if(type == "RADIOS"){
                newField.label = "New Radio Buttons";
                newField.options = [];
            }
            //console.log(newField);
            FieldService.createFieldForForm($routeParams.formId, newField)
                .then(function (response){
                    a.forms = response.data;
                    toRender();
                    //console.log(response.data);
                });
        }
    }
}) ();