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
                .otherwise({
                    redirectTo: "/"
                });
        });
})();