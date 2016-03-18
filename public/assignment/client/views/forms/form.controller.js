/**
 * Created by Nitish on 2/29/2016.
 */
(function (){
angular
    .module("FormBuilderApp")
    .controller("FormController", FormController);

function FormController(FormService, $rootScope){
    var a = this;

    a.addForm = addForm;
    a.updateForm = updateForm;
    a.deleteForm = deleteForm;
    a.selectForm = selectForm;
    var selectedIndex = -1;

    immediate();

    function immediate() {
        FormService.findAllFormsForUser($rootScope.currentUser._id)
            .then(function (response) {
                a.forms = response.data;
            });
    }
    function addForm(){
        FormService.createFormForUser((new Date()).getTime(),$scope.title,function(response){

        });
    }

    function updateForm(){
        FormService.updateFormById($scope.forms[selectedIndex]._id,$scope.title, function(response){

        });
    }

    function deleteForm(index){
        FormService.deleteFormById($scope.forms[index]._id,function(response){
        });
    }

    function selectForm(index){
        $scope.title = $scope.forms[index].title;
        selectedIndex = index;
    }
}
})();