/**
 * Created by Nitish on 2/16/2016.
 */

angular
    .module("FormBuilderApp",["ngRoute"])
    .controller("MainController", HelloWorldController);

function HelloWorldController($scope) {
    $scope.hello = "Hello World from AngularJS";
}