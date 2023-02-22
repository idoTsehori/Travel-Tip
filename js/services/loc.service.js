import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const locService = {
  getLocs,
  save,
  createLocation,
  remove,
}

const LOC_KEY = 'locDB'

const locs = [
  { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
  { name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
]

function getLocs() {
  return storageService.query(LOC_KEY)
}

// function createLocations(locations) {
//   const storage = utilService.loadFromStorage(LOC_KEY)
//   if (!storage) utilService.saveToStorage(LOC_KEY, locations)
// }

function createLocation(name, lat, lng) {
  return {
    name,
    lat,
    lng,
    createdAt: Date.now(),
    updatedAt: null,
  }
}

function save(location) {
  if (location.id) {
    //UPDATES OBJECTS
    return storageService.put(LOC_KEY, location)
  } else {
    console.log('location', location)
    //ADDS OBJECt
    return storageService.post(LOC_KEY, location)
  }
}

function remove(locId) {
  return storageService.remove(LOC_KEY, locId)
}
