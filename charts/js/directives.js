APP
.directive('content', ['TPL', function(TPL) {
    return {
        restrict: 'C',
        replace: false,
        templateUrl: 'html/content.html',
       // template: TPL.content,
        link: function($scope, $element, $attributes) {
            google.load('visualization', '1.0', { callback : function() {}, packages: ['corechart', 'table'] });
         }
      }
}])
;
