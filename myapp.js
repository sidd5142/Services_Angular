var app = angular.module("myApp", ['ui.router']);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) { 
	$stateProvider
		.state('Show', {
            url: '/showdata',
			templateUrl: 'show.html',
			controller: 'showCtrl',
		})
        .state('Edit', {
            url: '/editdata',
			templateUrl: 'Edit.html',
			controller: 'editCtrl',
		})		
		$urlRouterProvider.otherwise('/showdata');
}]);


app.factory('myFactory', function() {
    var savedData = {};
    function set(data) {
        savedData = data;
    }
    function get(data) {
        return savedData;
    }
    return {
        set : set,
        get : get
    }
})


app.controller('showCtrl', function($scope, $location, myFactory, $state) {
    $scope.Students = [
        {Name : 'Siddharth', Address : 'Prayagraj', Email : 'abc@gmail.com'},
        {Name : 'Anshu', Address : 'Delhi', Email : 'xyz@gmail.com'},
        {Name : 'Nikhil', Address : 'Mirzapur', Email : 'test@gmail.com'},
    ]
    $scope.Edit = function(d) {
        myFactory.set(d);
        $state.go('Edit')
    }
    $scope.$on('updateData', function(event, data) {
        $scope.Students = data;
    });
});

app.controller('editCtrl', function($scope, $state, myFactory, $rootScope) {
    // $scope.Students = myFactory.get();
    $scope.Students = angular.copy(myFactory.get()); // Copy data from factory
    $scope.Back = function() {
        myFactory.set($scope.Students);
        // $rootScope.$broadcast('updateData', $scope.Students);
        console.log($scope.Students);
        $state.go('Show')
    }
})

