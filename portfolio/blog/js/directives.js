APP
.directive('mainHeader', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/content.html',
        //template: TPL.content,
        link: function($scope, $element, $attributes) {
         }
      } 
 }])
.directive('footerContainerDeprr', [function() {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/footer.html',
        //template: TPL.portfolio,
        link: function($scope, $element, $attributes) {
            $scope.footerClass = 'footer';

            $scope.showHideFooter = function() {
                if (!$scope.noFooter) {
                    $scope.footerClass = 'shrunkFooter';
                    $scope.noFooter = true;
                }
                else {
                    $scope.noFooter = false;
                    $scope.footerClass = 'footer';
                }
            }
         }
      } 
 }])
 
.filter('checkInactive', function() {
    return function(input) { return input ? 'inactive' : ''; };
  })