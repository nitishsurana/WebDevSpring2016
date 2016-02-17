/**
 * Created by Nitish on 2/16/2016.
 */

var app = angular.module("FormBuilderApp", ["ngRoute"]);
app.controller("MainController", HelloWorldController);

function HelloWorldController($scope) {
    $scope.hello = "Hello World from AngularJS";
}