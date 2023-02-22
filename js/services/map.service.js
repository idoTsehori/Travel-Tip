import { locService } from './loc.service.js'

export const mapService = {
  initMap,
  addMarker,
  panTo,
}

// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
           return gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            // console.log('Map!', gMap)
            // gMap.addListener('click', (ev) => {
            //     console.log('ev', ev)
            //     const name = prompt('Place name?', 'Place 1')
            //     const lat = ev.latLng.lat()
            //     const lng = ev.latLng.lng()
            //     const location=createLocation(name,lat,lng)
            //     locService.save(location).then(renderLocOnList)

              //   addPlace(name, lat, lng, gMap.getZoom())
              //   renderPlaces()
              //   renderMarkers()
            //   })
            
              // renderMarkers()
        })
        
}



function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: 'Hello World!',
  })
  return marker
}


function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng)
  gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  const API_KEY = 'AIzaSyA15iaLI4_0w20q7DYxdrxQ609n_Max9sE'
  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve
    elGoogleApi.onerror = () => reject('Google script failed to load')
  })
}
