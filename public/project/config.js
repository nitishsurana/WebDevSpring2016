/**
 * Created by Nitish on 3/2/2016.
 */
(function(){
    angular
        .module("PortfolioManager", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: "HomeController"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/portfolio", {
                    templateUrl: "views/portfolio/portfolio.view.html",
                    controller: "PortfolioController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();