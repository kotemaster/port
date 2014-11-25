APP
.directive('mapWs', ['TPL', 'GEO',  function(TPL, GEO) {
    return {
        restrict: 'A',
        replace: true,
        template: TPL.mapWs,
        link: function(scope, el) {
            setTimeout( function() { GEO.init(el[0]); }, 0);
        }
    }
}])
.directive('leftWs', ['TPL', function(TPL) {
    return {
        restrict: 'A',
        replace: true,
        template: TPL.leftWs,
        link: function(scope, el) {
        }
    }
}])
.directive('rightWs', ['TPL', function(TPL) {
    return {
        restrict: 'A',
        replace: true,
        template: TPL.rightWs,
        link: function(scope, el) {
        }
    }
}])
.directive('menuWs', ['TPL', 'OLCtrl', function(TPL, OLCtrl) {
    return {
        restrict: 'A',
        replace: true,
        template:  TPL.menuWs,
        link: function($scope, el) {
            $scope.active = '';
            $scope.point = $scope.center = $scope.elevation = 0;
            $scope.box = 1;

            $scope.activate = function(what) { 
                $scope.active && OLCtrl.deactivate($scope.active);
                if (what != $scope.active) {
                    $scope.active && ($scope[$scope.active] = 0);
                    $scope[what] = 1;
                    $scope.active = what;

                    OLCtrl.activate(what, function(loc, el) {
                        $scope.coords.elevation = $scope.active == 'elevation' ? el.toFixed(4) : 0;

                        if ($scope.active != 'box') {
                            $scope.coords.lon = loc.lon.toFixed(4);
                            $scope.coords.lat = loc.lat.toFixed(4);
                        } else {
                            $scope.coords.lon = loc.tl.lon.toFixed(4);
                            $scope.coords.lat = loc.tl.lat.toFixed(4);
                        }
                        $scope.$digest();
                    }); 
                } else { 
                    $scope[$scope.active] = 0;
                    $scope.active = '';
                }
            }
            setTimeout( function () { $scope.activate($scope.active = 'box');}, 800);
        }
    }
}])
.directive('footerWs', ['TPL', function(TPL) {
    return {
        restrict: 'A',
        replace: true,
        template: TPL.footerWs,
        link: function(scope, el) { }
    }
}])
.directive('whitespace', ['TPL', 'GEO', function(TPL, GEO) {
    return {
        restrict: 'E',
        replace:false,
        scope: {plugData: "="},
        template: TPL.whitespace,
        link: function($scope, $element, $attributes) {
            $scope.coords = {};
            $scope.locAddress = function() {
                GEO.locAddress( $scope.addr, function(coords) { 
                    $scope.coords = coords;
                    LG( $scope.coords );
                    $scope.$digest();
                });
            }
        }
    }
}])
;
window.whitespacePluginLoaded = true;