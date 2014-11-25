function LG(arg) { console.log(arg); }
if (typeof APP == 'undefined') var APP = angular.module('WS',[]);

APP
.factory('GEO', ['OL', function(OL) {
    var map;
    var geocoder; 
    function lonLat(lon, lat, trans) {
        return trans 
            ? new OpenLayers.LonLat(lon, lat).transform('EPSG:4326', 'EPSG:3857')
            : new OpenLayers.LonLat(lon, lat);
    }
    return {
        map: map,
        init: function(domEl) {
            var bingK   = "AgAuqEizNCG46goQiquz3ERCSuMYj8hr1udAEXpb1-kix08_29KzSOGQCkyL_eJc";
            geocoder    = new google.maps.Geocoder();
            map = new OpenLayers.Map('content', {
                layers: [
                    //new OpenLayers.Layer.WMS("Open Street", "http://maps.opengeo.org/geowebcache/service/wms", { layers : "openstreetmap", format : "image/png" }),
                    new OpenLayers.Layer.Google( "Google Streets", {numZoomLevels: 22}
                    ),
                    new OpenLayers.Layer.Google( "Google Physical",
                        {type: google.maps.MapTypeId.TERRAIN, numZoomLevels:18}
                    ),
                    new OpenLayers.Layer.Google( "Google Hybrid",
                        {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
                    ),
                    new OpenLayers.Layer.Google( "Google Satellite",
                        {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
                    ),
                    new OpenLayers.Layer.Bing({ name: "Bing Road", key: bingK, type: "Road" }),
                    new OpenLayers.Layer.Bing({ name: "Bing Hybrid",
                        key: bingK,
                        type: "AerialWithLabels"
                    }),
                    new OpenLayers.Layer.Bing({ name: "Bing Aerial", key: bingK, type: "Aerial" })
                ],
                //center: new OpenLayers.LonLat(21.018267, 52.235850).transform('EPSG:4326', 'EPSG:3857'),
                center: lonLat(21.018267, 52.235850, true),
                zoom:14,
                controls: [
                    new OpenLayers.Control.Navigation(),
                    new OpenLayers.Control.PanZoomBar(),
                    new OpenLayers.Control.LayerSwitcher({'ascending':true}),
                    new OpenLayers.Control.ScaleLine(),
                ]
            });
            OL.setMap(map);
            OL.Ctrl(['box', 'point', 'center', 'elevation']);

            var idx = 1;
            // test circle in Gdynia Redłowo
            var lr = OL.RingM('1Km Marker',[[18.54, 54.48], [18.55, 54.49]], 'green');
            map.addLayer(lr);
            var lr1 = OL.RingV('1Km from Home',[[18.53, 54.47], [18.54, 54.48]], 'short');
            map.addLayer(lr1);
            map.setLayerIndex(lr, ++idx);
            setTimeout(function() { 
                for (var i=0; i<lr1.features.length; i++) {
                    lr1.features[i].style.display = 'none';
                    lr1.redraw();
                }
            }, 218000);
        },
        locAddress: function(addr, cb) {
            geocoder.geocode( { 'address': addr}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var loc = results[0].geometry.location;
                    map.setCenter(lonLat(loc.B, loc.k, true), 22);

                    //new google.maps.Marker({ map: map, position: loc });
                    cb({'lat': loc.k, 'lon': loc.B});
                } else { cb(false); }
            });
        }
    }
}])
.factory('OLStyle', [function() {
    var STYLES = {};

    var Host =  'http://' + document.location.host + '/';
    var imgPath = Host + 'image/';
    var markerWidth24 = 16;
    var markerWidth36 = 24;

    var def = function(styleId, base, params)    { 
        if ( typeof STYLES[styleId] == 'undefined' ) {
            STYLES[styleId] = OpenLayers.Feature.Vector.style['default'];
            typeof STYLES[base] != 'undefined' && (STYLES[styleId] = angular.copy(STYLES[base]));
            typeof params != 'undefined' && (STYLES[styleId] = angular.copy(params, STYLES[styleId]));
            STYLES[styleId].id = styleId;
        }
    };

    def('base', '',  {graphicOpacity: 1, 'strokeWidth' : 1});
    def('green',  'base', {'fillOpacity': 0.9, 'strokeColor': '#008800', 'fillColor' : '#44ffaa',
            externalGraphic : imgPath + 'markgreen.png', graphicWidth : 12,  graphicHeight: 24,
            graphicYOffset: -24});
    def('red',    'green', {'strokeColor': 'red', 'fillColor' : '#ff8844'});
    def('blue',   'green', {'strokeColor': '#0044ff', 'fillColor' : '#88aaff'});
    def('noshow',   'green', {'strokeColor': 'transparent', 'fillColor' : 'transparent', 'display' : 'none'});

    def('long',   'green', {'strokeColor': '#00aa00', 'fillOpacity' : 0.1 });
    def('med',   'green', {'fillOpacity': 0.2, 'fillColor' : '#008800'});
    def('short',   'green', {'strokeColor': '#880000', 'fillOpacity' : 0.2, 'fillColor' : '#aa0000' });

    def('marker','', {   graphicHeight : 20, graphicYOffset : -20, 
                        graphicWidth : 12,  graphicXOffset : -6, 
                        externalGraphic : imgPath + 'pin.png', fillOpacity:1} );

    LG( STYLES );
    return {
        get: function(styleId) { return STYLES[styleId]; }
    };
}])
.factory('OLCtrl', [function() {
    var _this = this;
    var cbk = null;
    var ml = new OpenLayers.Layer.Vector("Selects");
    var ctrls = {
        box : new OpenLayers.Control.DrawFeature(
            ml, OpenLayers.Handler.Box, { callbacks: { done: function(a) {
            //console.log( 'box done', a);
            _this.cbk({ 
                tl: _this.map.getLonLatFromPixel( 
                    new OpenLayers.Pixel(a.top, a.left)).transform('EPSG:3857', 'EPSG:4326'
                ),
                br: _this.map.getLonLatFromPixel(
                    new OpenLayers.Pixel(a.bottom, a.right)).transform('EPSG:3857', 'EPSG:4326')
            });
            //ctrls.box.deactivate();
        }}}),
        center : new OpenLayers.Control.DrawFeature(
            ml, OpenLayers.Handler.Point, { callbacks: { done: function(a) {
                _this.map.setCenter(new OpenLayers.LonLat(a.x, a.y));
                _this.cbk((new OpenLayers.LonLat(a.x, a.y)).transform('EPSG:3857', 'EPSG:4326'), 0);
                //ctrls.center.deactivate();
        }}}),
        point:  new OpenLayers.Control.DrawFeature(
            ml, OpenLayers.Handler.Point, { callbacks: { done: function(a) {
                a.transform('EPSG:3857', 'EPSG:4326');
                _this.cbk((new OpenLayers.LonLat(a.x, a.y)), 0);
                //ctrls.point.deactivate();
        }}}),
        elevation:  new OpenLayers.Control.DrawFeature(
            ml, OpenLayers.Handler.Point, { callbacks: { done: function(a) {
                a.transform('EPSG:3857', 'EPSG:4326');
                (new google.maps.ElevationService()).getElevationForLocations(
                    { locations: [new google.maps.LatLng(a.y, a.x)] },
                    function(v) {
                        _this.cbk((new OpenLayers.LonLat(v[0].location.B, v[0].location.k)), v[0].elevation);
                    }
                );
                //ctrls.elevation.deactivate();
        }}})
    };

    setTimeout( function() { _this.map.addLayer(ml); }, 100);

    return {
        map: null,
        init: function(what) {
            setTimeout( function() { 
                if (typeof what == 'string') 
                    _this.map.addControl(ctrls[what]); 
                else 
                    for (var i=0; i<what.length; i++) _this.map.addControl(ctrls[what[i]]); 
            }, 0);
        },
        activate:   function(what, cb)  { _this.cbk = cb; ctrls[what].activate(); },
        deactivate: function(what)      { LG(what); LG( ctrls); ctrls[what].deactivate(); },
        setMap:     function( map )     { _this.map = map; }
    }
}])
.factory('OL', ['OLStyle', 'OLCtrl', function(OLStyle, OLCtrl) {
    var pointList= function(l, closeIt) {
        var poly = [];
        for (var i=0; i< l.length; i++) 
            poly.push( (new OpenLayers.Geometry.Point(l[i][0], l[i][1])).transform('EPSG:4326', 'EPSG:3857'));

        if (typeof closeIt!= 'undefined' && closeIt) {
            if (l[0][0] != l[l.length-1][0] || l[0][1] != l[l.length-1][1])
                poly.push(poly[0]);
        }
        return {o: this, v:poly};
    };
    var ring = function(l) {
        var pList = pointList(l, true).v;
        return new OpenLayers.Geometry.LinearRing(pList);
    }; 

    var circ = function(origin, radius) {
        origin = new OpenLayers.Geometry.Point(origin[0], origin[1]).transform('EPSG:4326', 'EPSG:3857');;
        typeof radius == 'undefined' && (radius = 1300); // 1.3km
        return new OpenLayers.Geometry.Polygon.createRegularPolygon(origin, radius, 40);
    };

    var markF = function(l, style) { 
        //return new OpenLayers.Feature.Vector( ring(l), null, OLStyle.get('style') );
        var circs = [];
        if (typeof l[0] == 'number') {
                var point =  new OpenLayers.Geometry.Point(l[i], l[i], OLStyle.get('green')).transform('EPSG:4326', 'EPSG:3857');
                circs =  new OpenLayers.Feature.Vector(point,null, OLStyle.get('green'));
        } else {
            for (var i=0; i< l.length; i++ ) {
                var point =  new OpenLayers.Geometry.Point(l[i][0], l[i][1], OLStyle.get('green')).transform('EPSG:4326', 'EPSG:3857');
                var vector =  new OpenLayers.Feature.Vector(point,null, OLStyle.get('green'));
                circs.push(vector);
            }
        }
        return circs; 
    };
    var ringF = function(l, style) { 
        //return new OpenLayers.Feature.Vector( ring(l), null, OLStyle.get('style') );
        var circs = [];
        if (typeof l[0] == 'number') {
            circs = new OpenLayers.Feature.Vector( circ(l), null, OLStyle.get(style) );
        } else {
            for (var i=0; i< l.length; i++ ) {
                var point =  new OpenLayers.Geometry.Point(l[i][0], l[i][1], OLStyle.get('marker')).transform('EPSG:4326', 'EPSG:3857');
                var vector =  new OpenLayers.Feature.Vector(point,null, OLStyle.get('marker'));
                circs.push( new OpenLayers.Feature.Vector( circ(l[i]), null, OLStyle.get(style) ));
                circs.push(vector);
            }
        }
        return circs; 
    };

    var ringV = function(id, l, style) {
        var v = new OpenLayers.Layer.Vector(id, { rendererOptions: {zIndexing: true} });
        //v.addFeatures(ringF(l, OLStyle.get(style)));
        v.addFeatures(ringF(l, style));
        return v;
    };

    var ringM = function(id, l, style) {
        var v = new OpenLayers.Layer.Vector(id, { rendererOptions: {zIndexing: true} });
        //v.addFeatures(ringF(l, OLStyle.get(style)));
        v.addFeatures(markF(l, style));
        return v;
    };

    var _this = this;
    return {
        List: function(l, closeIt) { return pointList(l, closeIt); },
        Ring: function(l) { return ring(l); },
        RingF: function(l, style) { return ringF(l, style); },
        RingV: function(id, l, style) { return ringV(id, l, style); },
        RingM: function(id, l, style) { return ringM(id, l, style); },
        setMap: function( map ) { _this.map = map; OLCtrl.setMap(map); },
        Ctrl: function(what) { OLCtrl.init(what); }
    }
}])
.factory('UT', [function() {
    return {
        plunk: function(inA, idx) {
            var retA = [];
            for (var i=0; i<inA.length; i++) {
                if (i != idx) retA.push(inA[i]);
            }
            return retA;
        },
        plunkVal: function(inA, val) {
            var retA = [];
            for (var i=0; i<inA.length; i++) {
                if (inA[i] != val) retA.push(inA[i]);
            }
            return retA;
        },
        inRange: function(vals, key, range) {
            for (var i=0; i<vals.length; i++)
                if (vals[i][key] < range[0] || vals[i][key] > range[1]) return false;

            return true;
        },
        arEmpty: function(ar) {
            for (var i=0; i<ar.length; i++) if (ar[i]) return false;
            return true;
        },
        camelize: function (str) {
            return (str + "").replace(/-\D/g, function(match) {
              return match.charAt(1).toUpperCase();
            });
        }
    };
}])
;
