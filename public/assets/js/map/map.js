(function ($) {
    "use strict";
    var markerIcon = {
        anchor: new google.maps.Point(22, 16),
        url: '/static/assets/img/marker.png',
    }

    function mainMap() {
        function locationData(listingURL, listingImg, authorLink, authorImg, listingName, listingLocation, listingReviews) {
            return ('<div class="map-popup-wrap"><div class="map-popup"><div class="infoBox-close"><i class="fa fa-times"></i></div><div class="listingitem-container"><div class="singlelisting-item bg-light border-0"><div class="listing-top-item"><a href="' + listingURL + '" class="topLink"><img src="' + listingImg + '" class="img-fluid" alt="Listing Image"></a><div class="opssListing position-absolute start-0 bottom-0 ms-3 mb-4 z-2"><div class="d-flex align-items-center justify-content-start gap-2"><div class="listing-avatar"><a href="' + authorLink + '" class="avatarImg"><img src="' + authorImg + '" class="img-fluid circle" alt="Avatar"></a></div><div class="listing-details"><h4 class="listingTitle"><a href="' + listingURL + '" class="titleLink">' + listingName + '</a></h4><div class="list-infos"><div class="d-flex align-items-center justify-content-start gap-3 mt-1"><div class="list-distance text-light"><i class="bi bi-geo-alt mb-0 me-2"></i>' + listingLocation + '</div></div></div></div></div></div></div><div class="listing-footer-item border-0"><div class="d-flex align-items-center justify-content-start gap-2"><div class="listing-rates"><div class="d-flex align-items-center justify-content-start gap-2"><span class="d-flex align-items-center justify-content-start gap-1 text-sm"><i class="bi bi-star-fill mb-0 text-warning"></i><i class="bi bi-star-fill mb-0 text-warning"></i><i class="bi bi-star-fill mb-0 text-warning"></i><i class="bi bi-star-fill mb-0 text-warning"></i><i class="bi bi-star-half mb-0 text-warning"></i></span><span class="text-md text-muted-2 hide-mob">(' + listingReviews + ' Reviews)</span></div></div></div></div></div></div></div></div>')
        }
        var locations = [
            [locationData('/single-listing-01/', '/static/assets/img/list-1.jpg', '/author-profile/', '/static/assets/img/team-1.jpg', 'The Big Bumbble Gym', 'New York', '144'), 40.72956781, -73.99726866, 0, markerIcon],
            [locationData('/single-listing-01/', '/static/assets/img/list-2.jpg', '/author-profile/', '/static/assets/img/team-2.jpg', 'Greenvally Real Estate', 'San Jose', '22'), 40.76221766, -73.96511769, 1, markerIcon],
            [locationData('/single-listing-01/', '/static/assets/img/list-3.jpg', '/author-profile/', '/static/assets/img/team-3.jpg', 'Shree Wedding Planner', 'San Francisco', '120'), 40.88496706, -73.88191222, 2, markerIcon],
            [locationData('/single-listing-01/', '/static/assets/img/list-4.jpg', '/author-profile/', '/static/assets/img/team-4.jpg', 'The Blue Ley Light', 'San Antonio', '76'), 40.72228267, -73.99246214, 3, markerIcon],
            [locationData('/single-listing-01/', '/static/assets/img/list-5.jpg', '/author-profile/', '/static/assets/img/team-5.jpg', 'Shreya Study Center', 'Las Vegas', '85'), 40.94982541, -73.84357452, 4, markerIcon],
            [locationData('/single-listing-01/', '/static/assets/img/list-6.jpg', '/author-profile/', '/static/assets/img/team-6.jpg', 'Mahroom Garage & Workshop', 'Columbus', '134'), 40.90261483, -74.15737152, 5, markerIcon],
            [locationData('/single-listing-01/', '/static/assets/img/list-7.jpg', '/author-profile/', '/static/assets/img/team-7.jpg', 'Sudha Neoro Center', 'Los Angeles', '55'), 40.79145927, -74.08252716, 6, markerIcon],
            [locationData('/single-listing-01/', '/static/assets/img/list-8.jpg', '/author-profile/', '/static/assets/img/team-8.jpg', 'Magloom Spa Center', 'Kansas City', '117'), 40.58423508, -73.96099091, 7, markerIcon],
            [locationData('/single-listing-01/', '/static/assets/img/list-9.jpg', '/author-profile/', '/static/assets/img/team-1.jpg', 'Bridge Stro Bar', 'New Orleans', '72'), 40.58110616, -73.97678375, 8, markerIcon],
            [locationData('/single-listing-01/', '/static/assets/img/list-10.jpg', '/author-profile/', '/static/assets/img/team-3.jpg', 'The Blue Meusium', 'Jacksonville', '87'), 40.73112881, -74.07897948, 9, markerIcon],
            [locationData('/single-listing-01/', '/static/assets/img/list-11.jpg', '/author-profile/', '/static/assets/img/team-3.jpg', 'Quality Coffee Shop', 'Long Beach', '28'), 40.67386831, -74.10438536, 10, markerIcon],
        ];

        var map = new google.maps.Map(document.getElementById('map-main'), {
            zoom: 9,
            scrollwheel: false,
            center: new google.maps.LatLng(40.7, -73.87),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            panControl: false,
            fullscreenControl: true,
            navigationControl: false,
            streetViewControl: false,
            animation: google.maps.Animation.BOUNCE,
            gestureHandling: 'cooperative',
            styles: [{
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#444444"
                }]
            }]
        });


        var boxText = document.createElement("div");
        boxText.className = 'map-box'
        var currentInfobox;
        var boxOptions = {
            content: boxText,
            disableAutoPan: true,
            alignBottom: true,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-145, -45),
            zIndex: null,
            boxStyle: {
                width: "260px"
            },
            closeBoxMargin: "0",
            closeBoxURL: "",
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false,
        };
        var markerCluster, marker, i;
        var allMarkers = [];
        var clusterStyles = [{
            textColor: 'white',
            url: '',
            height: 50,
            width: 50
        }];


        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                icon: locations[i][4],
                id: i
            });
            allMarkers.push(marker);
            var ib = new InfoBox();
            
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    ib.setOptions(boxOptions);
                    boxText.innerHTML = locations[i][0];
                    ib.close();
                    ib.open(map, marker);
                    currentInfobox = marker.id;
                    var latLng = new google.maps.LatLng(locations[i][1], locations[i][2]);
                    map.panTo(latLng);
                    map.panBy(0, -180);
                    google.maps.event.addListener(ib, 'domready', function () {
                        $('.infoBox-close').click(function (e) {
                            e.preventDefault();
                            ib.close();
                        });
                    });
                }
            })(marker, i));
        }
        var options = {
            imagePath: 'img/',
            styles: clusterStyles,
            minClusterSize: 2
        };
        markerCluster = new MarkerClusterer(map, allMarkers, options);
        google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });

        $('.nextmap-nav').click(function (e) {
            e.preventDefault();
            map.setZoom(15);
            var index = currentInfobox;
            if (index + 1 < allMarkers.length) {
                google.maps.event.trigger(allMarkers[index + 1], 'click');
            } else {
                google.maps.event.trigger(allMarkers[0], 'click');
            }
        });
        $('.prevmap-nav').click(function (e) {
            e.preventDefault();
            map.setZoom(15);
            if (typeof (currentInfobox) == "undefined") {
                google.maps.event.trigger(allMarkers[allMarkers.length - 1], 'click');
            } else {
                var index = currentInfobox;
                if (index - 1 < 0) {
                    google.maps.event.trigger(allMarkers[allMarkers.length - 1], 'click');
                } else {
                    google.maps.event.trigger(allMarkers[index - 1], 'click');
                }
            }
        });
        $('.map-item').click(function (e) {
            e.preventDefault();
     		map.setZoom(15);
            var index = currentInfobox;
            var marker_index = parseInt($(this).attr('href').split('#')[1], 10);
            google.maps.event.trigger(allMarkers[marker_index], "click");
			if ($(this).hasClass("scroll-top-map")){
			  $('html, body').animate({
				scrollTop: $(".map-container").offset().top+ "-80px"
			  }, 500)
			}
			else if ($(window).width()<1064){
			  $('html, body').animate({
				scrollTop: $(".map-container").offset().top+ "-80px"
			  }, 500)
			}
        });
        var zoomControlDiv = document.createElement('div');
        var zoomControl = new ZoomControl(zoomControlDiv, map);

        function ZoomControl(controlDiv, map) {
            zoomControlDiv.index = 1;
            map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(zoomControlDiv);
            controlDiv.style.padding = '5px';
            var controlWrapper = document.createElement('div');
            controlDiv.appendChild(controlWrapper);
            var zoomInButton = document.createElement('div');
            zoomInButton.className = "mapzoom-in";
            controlWrapper.appendChild(zoomInButton);
            var zoomOutButton = document.createElement('div');
            zoomOutButton.className = "mapzoom-out";
            controlWrapper.appendChild(zoomOutButton);
            google.maps.event.addDomListener(zoomInButton, 'click', function () {
                map.setZoom(map.getZoom() + 1);
            });
            google.maps.event.addDomListener(zoomOutButton, 'click', function () {
                map.setZoom(map.getZoom() - 1);
            });
        }


    }
    var map = document.getElementById('map-main');
    if (typeof (map) != 'undefined' && map != null) {
        google.maps.event.addDomListener(window, 'load', mainMap);
    }

})(this.jQuery);