/**
 * Created by Nitish on 2/16/2016.
 */
(function(){
    angular
        .module("FormBuilderApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                .when("/forms", {
                    templateUrl: "views/forms/forms.view.html",
                    controller: "FormController",
                    controllerAs: "model"
                })
                .when("/forms/:formId/fields", {
                    templateUrl: "views/fields/fields.view.html",
                    controller: "FieldController",
                    controllerAs: "model"
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });
})();