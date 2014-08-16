AP
.controller('datahomie', function ($scope) {
	$scope.list=[
		{"id":"1", "first":"Susie", "last":"Wang", "email":"susie@kendo.com"},
		{"id":"2", "first":"Tania", "last":"Delage", "email":"tania@kendo.com"},
		{"id":"3", "first":"Akane", "last":"D'Orangeville", "email":"akane@kendo.com"},
		{"id":"4", "first":"Melissa", "last":"Djap", "email":"melissa@kendo.com"},
		{"id":"5", "first":"Martina", "last":"Solano", "email":"martina@kendo.com"}
	];
	
	$scope.headers=["ID", "E-mail", "First Name", "Last Name"];
}) 

.directive('biglist', function() {
	return {
		restrict: 'ACE',
		template: '<ul id="header">'
				+ '<li ng-repeat="header in headers">'
				+ '{{header}}'
				+ '</li>'
				+ '</ul>',
			}
})
