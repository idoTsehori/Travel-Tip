import { storageService } from './async-storage.service.js'

export const locService = {
  getLocs,
}

// console.log('storageService:', storageService)

const locs = [
  { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
  { name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
]

// function getLocs() {
//   return storageService.query()
// }

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs)
    }, 2000)
  })
}
