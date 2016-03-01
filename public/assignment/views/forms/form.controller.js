/**
 * Created by Nitish on 2/29/2016.
 */
angular
    .module("FormBuilderApp")
    .controller("FormController", FormController);

function FormController($scope, FormService){
    $scope.addForm = addForm;
    $scope.updateForm = updateForm;
    $scope.deleteForm = deleteForm;
    $scope.selectForm = selectForm;
    $scope.forms = FormService.forms;
    var selectedIndex = -1;

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