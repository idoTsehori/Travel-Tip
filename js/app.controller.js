import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'



window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onDelete = onDelete
window.onLocationSearch = onLocationSearch

// locService.getLocs().then((res) => console.log(res))

function onInit() {
  locService.getLocs().then((locs) => {
    if (locs.length) renderLocsTable()
  })
  mapService
    .initMap()
    .then((map) => {
      // console.log('Map is ready')
      map.addListener('click', (ev) => {
        // console.log('ev', ev)
        const name = prompt('Place name?', 'Place 1')
        const lat = ev.latLng.lat()
        const lng = ev.latLng.lng()
        const location = locService.createLocation(name, lat, lng)
        locService.save(location)
        .then((location) =>{
          renderLocsTable()
          onAddMarker(lat,lng)
        })
      })
    })
    .catch(() => console.log('Error: cannot init map'))
}

function renderLocsTable() {
  locService.getLocs().then((locs) => {
    const strHTMLs = locs.map((loc) => {
      return `
      <article class="loc">
      Name: ${loc.name}
      Lat: ${loc.lat}, Lng: ${loc.lng}
      <button onclick="onPanTo(${loc.lat},${loc.lng})">Go</button>
      <button onclick="onDelete('${loc.id}','${loc.lat}','${loc.lng}')">Delete</button>
      </article>
      `
    })
    document.querySelector('.locations-info .locs').innerHTML = strHTMLs.join('')
  })
  //   console.log('locs:', locs)
  //   for (const loc in locs) {
  // console.log('loc:', loc) // key
  // console.log(locs[loc]) // value
  //   }
  //   const { name } = locs
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  // console.log('Getting Pos')
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

function onAddMarker(lat,lng) {
  mapService.addMarker({lat, lng})
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    console.log('Locations:', locs)
    document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
  })
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      // console.log('pos',pos)
      // console.log('User position is:', pos.coords)
      onPanTo(pos.coords.latitude, pos.coords.longitude)
      document.querySelector(
        '.user-pos'
      ).innerHTML = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
    })
    .catch((err) => {
      console.log('err!!!', err)
    })
}
function onLocationSearch(ev){
  ev.preventDefault()
  const value = document.querySelector('[name="search"]').value
  const apiKey = 'https://maps.googleapis.com/maps/api/geocode?key=AIzaSyA15iaLI4_0w20q7DYxdrxQ609n_Max9sE'

}
function onPanTo(lat, lng) {
  console.log('Panning the Map')
  mapService.panTo(lat, lng)
}

function onDelete(locId,lat,lng) {
  console.log('locId:', locId)
  // mapService.removeMarker(lat,lng)
  locService.remove(locId).then(renderLocsTable)
}
