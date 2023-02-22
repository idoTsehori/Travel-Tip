import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

 locService.getLocs()
.then(res =>{
    console.log('res', res)
})

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos

// locService.getLocs().then((res) => console.log(res))

function onInit() {
  locService.getLocs().then((locs) => {
    console.log('locs:', locs)
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
        locService.save(location).then(renderLocsTable)
      })
    })
    .catch(() => console.log('Error: cannot init map'))
}

function renderLocsTable() {
  locService.getLocs().then((locs) => {
    const strHTMLs = locs.map((loc) => {
      return `
      Name: ${loc.name}
      Lat: ${loc.lat}, Lng: ${loc.lng}
      <button onclick="onPanTo(${loc.lat},${loc.lng})">Go</button>
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
  console.log('Getting Pos')
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

function onAddMarker() {
  console.log('Adding a marker')

  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
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
      console.log('User position is:', pos.coords)
      document.querySelector(
        '.user-pos'
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
    })
    .catch((err) => {
      console.log('err!!!', err)
    })
}

function onPanTo(lat, lng) {
  console.log('Panning the Map')
  mapService.panTo(lat, lng)
}
