function initMap() {
    appMaps.setup();
}

const appMaps = {
    setting: {
        initGoogleMap: undefined, // objeto de google
        configMapGoogle: undefined,
        wrapper: undefined, // contenedor
        currentPosition: {
            lat: 0,
            lng: 0
        }, //posicion actual

        buttonSearchPosition: undefined //busacr la posicion

    },

    //funcion para inicilaizar la aplicacion

    setup: function () {
        appMaps.wrapper = document.getElementById('map'),
            appMaps.buttonSearchPosition = $('#encuentrame').on('click', appMaps.searchPosition),
            appMaps.currentPosition = {
                lat: -9.1191427,
                lng: -77.0349046
            },
            appMaps.configMapGoogle = {
                zoom: 5,
                center: appMaps.currentPosition,
                mapTypeControl: false,
                zoomControl: true,
                streetViewControl: true
            },

            appMaps.setting.initGoogleMap = new google.maps.Map(appMaps.wrapper, appMaps.configMapGoogle)

    },

    searchPosition: function (event) {
        if (navigator.geolocation) { //si tiene geolocation
            navigator.geolocation.getCurrentPosition(appMaps.currentPositionCallbacks.success, appMaps.currentPositionCallbacks.error);
        }

    },

    //como hacer pra cambiar mi configuracion en el init
    currentPositionCallbacks: {
        success: function (position) {
            appMaps.currentPosition.lat = position.coords.latitude;
            appMaps.currentPosition.lng = position.coords.longitude;

            //console.log(position.coords.latitude);

            let currentPositionMarker = new google.maps.Marker({
                position: appMaps.currentPosition,
                animation: google.maps.Animation.DROP,
                map: appMaps.setting.initGoogleMap

            });

            appMaps.setting.initGoogleMap.setZoom(17);
            appMaps.setting.initGoogleMap.setCenter(appMaps.currentPosition);
        },
        error: function () {
            alert('Tenemos un problema con encontrar tu ubicación');
        }
    },

}
