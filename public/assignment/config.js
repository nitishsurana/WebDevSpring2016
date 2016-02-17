/**
 * Created by Nitish on 2/16/2016.
 */
(function(){
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html"
                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();