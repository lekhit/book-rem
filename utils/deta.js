import { Deta } from 'deta'
import { MongoClient } from 'mongodb'

const key = process.env.DETA_KEY

let client
let db
console.log(process.env.DETA_KEY)
if (!process.env.DETA_KEY) {
  throw new Error('Please add your deta key to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (! global._detadb) {
client = Deta(key)
// name your DB

 global._detadb = client
     }

client = global._detadb
} else {
  // In production mode, it's best to not use a global variable.
  
  client = Deta(key)
// name your DB

}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.


export default client
