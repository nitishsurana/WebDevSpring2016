/**
 * Created by Nitish on 2/16/2016.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController", SidebarController);

    function SidebarController($scope,$location) {
        $scope.$location = $location;
    }
})();