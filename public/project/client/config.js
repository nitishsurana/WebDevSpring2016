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
                    controllerAs: "model",
                    resolve: {
                        loggedIn: checkLoggedIn
                    }
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController",
                    controllerAs: "model",
                    resolve: {
                        loggedIn: checkLoggedIn
                    }
                })
                .when("/admin", {
                    templateUrl: "views/admin/admin.view.html",
                    controller: "AdminController",
                    controllerAs: "model",
                    resolve: {
                        loggedIn: checkLoggedIn
                    }
                })
                .otherwise({
                    redirectTo: "/"
                });
        });

    function checkLoggedIn($q, $rootScope, $location, $http){
        var deferred = $q.defer();

        $http.get("/api/project/loggedin")
            .success(function(user){
                $rootScope.errorMessage = null;
                if(user != '0'){
                    $rootScope.currentUser = user;
                    deferred.resolve();
                }
                else{
                    $location.url("/login");
                }
            });
        return deferred.promise;
    }
})();