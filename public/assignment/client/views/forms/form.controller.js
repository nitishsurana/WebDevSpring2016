/**
 * Created by Nitish on 2/29/2016.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $rootScope, $location) {
        var a = this;

        a.addForm = addForm;
        a.updateForm = updateForm;
        a.deleteForm = deleteForm;
        a.selectForm = selectForm;
        a.goToField = goToField;
        a.sortType = 'a.form.title';
        a.sortReverse = false;
        var selectedIndex = -1;

        immediate();

        function immediate() {
            FormService.findAllFormsForUser($rootScope.currentUser._id)
                .then(function (response) {
                    a.forms = response.data;
                }, function(error){
                    a.alert("Error in Loading the page. Please re-load the page.");
                });
        }

        function addForm() {

            FormService.createFormForUser($rootScope.currentUser._id, a.form.title)
                .then(function (response) {
                    a.form.title = "";
                    immediate();
                }, function(error){
                    a.alert("Error in creating Form. Please try again.");
                });

        }

        function updateForm() {
            var t = {
                title: a.form.title
            };
            FormService.updateFormById(a.forms[selectedIndex]._id, t)
                .then(function (response) {
                    a.form.title = "";
                    immediate();
                }, function(error){
                    a.alert("Error in updating Form. Please try again.");
                });
        }

        function deleteForm(index) {
            FormService.deleteFormById(a.forms[index]._id)
                .then(function (response) {
                    immediate();
                }, function(error){
                    a.alert("Error in deleting Form. Please try again.");
                });
        }

        function selectForm(index) {
            var selectedForm = a.forms[index];
            a.form = {
                _id: selectedForm._id,
                title: selectedForm.title,
                userId: selectedForm.userId
            };
            selectedIndex = index;
        }

        function goToField(index) {
            $location.url("/forms/" + a.forms[index]._id + "/fields");
        }
    }
})();