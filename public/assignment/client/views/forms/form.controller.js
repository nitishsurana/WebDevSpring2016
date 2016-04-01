/**
 * Created by Nitish on 2/29/2016.
 */
(function (){
angular
    .module("FormBuilderApp")
    .controller("FormController", FormController);

function FormController(FormService, $rootScope, $location){
    var a = this;

    a.addForm = addForm;
    a.updateForm = updateForm;
    a.deleteForm = deleteForm;
    a.selectForm = selectForm;
    a.goToField = goToField;
    var selectedIndex = -1;

    immediate();

    function immediate() {
        //console.log($rootScope.currentUser._id);
        FormService.findAllFormsForUser($rootScope.currentUser._id)
            .then(function (response) {
                a.forms = response.data;
                a.form.title = "";
                //console.log(a.forms);
            });
    }
    function addForm(){
        //console.log($rootScope.currentUser._id);
        //console.log(a.form.title);

        FormService.createFormForUser($rootScope.currentUser._id,a.form.title)
            .then(function (response){
                //a.forms = response.data;
                immediate();
                //console.log(a.forms);
            });

    }

    function updateForm(){
        var t={
            title: a.form.title
        };
        FormService.updateFormById(a.forms[selectedIndex]._id,t)
            .then(function(response){
                //a.forms = response.data;
                immediate();
                //console.log(response.data);
        });
    }

    function deleteForm(index){
        console.log(a.forms[index]._id);
        FormService.deleteFormById(a.forms[index]._id)
            .then(function (response){
                immediate();
                //a.forms = response.data;
                //console.log(response.data);
            });
    }

    function selectForm(index){
        console.log(a.forms[index].title);
        var selectedForm = a.forms[index];
        a.form = {
            _id: selectedForm._id,
            title: selectedForm.title,
            userId: selectedForm.userId
        };
        selectedIndex = index;
    }

    function goToField(index) {
        //console.log("/forms/" + a.forms[index]._id + "/fields");
        $location.url("/forms/" + a.forms[index]._id + "/fields");
    }
}
})();