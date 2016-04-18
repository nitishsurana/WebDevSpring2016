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
                    controller: "HomeController",
                    controllerAs: "model"
                })
                .when("/search/option/:symbol", {
                    templateUrl: "views/search/details.view.html",
                    controller: "DetailsController",
                    controllerAs: "model"
                })
                .when("/search/investor/:id", {
                    templateUrl: "views/search/details.view.html",
                    controller: "DetailsController",
                    controllerAs: "model"
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController",
                    controllerAs: "model"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
                .when("/portfolio", {
                    templateUrl: "views/portfolio/portfolio.view.html",
                    controller: "PortfolioController",
                    controllerAs: "model"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model"
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    controllerAs: "model"
                })
                .otherwise({
                    redirectTo: "/"
                });
        });
})();