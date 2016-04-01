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
        a.edit = edit;

        toRender();
        function toRender(){
            console.log($routeParams.formId);
            FieldService.getFieldsForForm($routeParams.formId)
                .then(function (response){
                    //console.log(response);
                    a.fields = response.data.fields;
                    //console.log(a.fields);
                });
        }

        function removeField(fieldId) {
            //console.log(fieldId);
            FieldService.deleteFieldFromForm($routeParams.formId, fieldId)
                .then(function(response){
                    a.fields = response.data;
                    toRender();
                    //console.log(a.fields);
                })
        }

        function addField(type) {
            console.log(type);
            var newField = {
                label: "",
                type: type,
                placeholder: "",
                options: []
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
                newField.options = [
                    {"label": "Option 1", "value": "OPTION_1"},
                    {"label": "Option 2", "value": "OPTION_2"},
                    {"label": "Option 3", "value": "OPTION_3"}
                ];
            }
            else if(type == "CHECKBOXES"){
                newField.label = "New Checkboxes";
                newField.options = [
                    {"label": "Option A", "value": "OPTION_A"},
                    {"label": "Option B", "value": "OPTION_B"},
                    {"label": "Option C", "value": "OPTION_C"}
                ];
            }
            else if(type == "RADIOS"){
                newField.label = "New Radio Buttons";
                newField.options = [
                    {"label": "Option X", "value": "OPTION_X"},
                    {"label": "Option Y", "value": "OPTION_Y"},
                    {"label": "Option Z", "value": "OPTION_Z"}
                ];
            }
            //console.log(newField);
            FieldService.createFieldForForm($routeParams.formId, newField)
                .then(function (response){
                    a.forms = response.data;
                    //console.log(a.forms);
                    toRender();
                    //console.log(response.data);
                });
        }

        function edit(field) {
            a.selectedField = field;
            if (field.options){
                a.option = '';
                for(var i = 0; i< field.options.length ; i++){
                    a.option += field.options[i].label + ":" + field.options[i].value + "\n";
                }
            }
            //console.log(a.selectedField);
        }

        a.sortableFields = {
            axis : 'y'
        };
    }
}) ();