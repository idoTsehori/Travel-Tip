import { storageService } from './async-storage.service.js'

export const locService = {
  getLocs,
}
const LOC_KEY = 'locDB'

// console.log('storageService:', storageService)

const locs = [
  { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
  { name: 'Neveragain', lat: 32.047201, lng: 34.832581 },
]

getLocs()
function getLocs() {
  return storageService.query(LOC_KEY).then((loc) => {
    loc.post()
  })
}

// function getLocs() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(locs)
//     }, 2000)
//   })
// }
