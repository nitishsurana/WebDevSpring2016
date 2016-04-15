/**
 * Created by Nitish on 2/16/2016.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .config(function($routeProvider){
            $routeProvider
                .when("/home", {
                    templateUrl: "views/home/home.view.html"
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
                        loggedIn: checkAdmin
                    }
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
                    controllerAs: "model",
                    resolve: {
                        loggedIn: checkLoggedIn
                    }
                })
                .when("/forms/:formId/fields", {
                    templateUrl: "views/fields/fields.view.html",
                    controller: "FieldController",
                    controllerAs: "model",
                    resolve: {
                        loggedIn: checkLoggedIn
                    }
                })
                .otherwise({
                    redirectTo: "/home"
                });
        });

    function checkLoggedIn($q, $rootScope, $location, $http){
        var deferred = $q.defer();

        $http.get("/api/assignment/loggedIn")
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

    function checkCurrentUser($q, $http, $location, $rootScope){

        var deferred = $q.defer();

        $http.get("/api/assignment/loggedIn")
            .success(function(user){
                $rootScope.errorMessage = null;
                if(user != '0'){
                    $rootScope.currentUser = user;
                } else{
                    $location.url("/login");
                }
                deferred.resolve();
            });
        return deferred.promise;
    }

    function checkAdmin($q, $http, $rootScope, $location) {
        var deferred = $q.defer();

        $http.get("/api/assignment/loggedIn")
            .success(function(user){
                $rootScope.errorMessage = null;
                if(user!= '0' && user.roles.indexOf('admin')!=-1){
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else{
                    $location.url("/login");
                }
            });
        return deferred.promise;
    }
})();