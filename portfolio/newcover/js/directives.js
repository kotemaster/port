APP
.directive('mainContent', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/content.html',
        //template: TPL.content,
        link: function($scope, $element, $attributes) {
            $scope.tabIdx = 1;
         }
      } 
 }])
.directive('portfolio', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/portfolio.html',
        //template: TPL.portfolio,
        link: function($scope, $element, $attributes) {
         }
      } 
 }])
.filter('checkActive', function() {
    return function(input) { return input ? 'active' : '' };
})
 