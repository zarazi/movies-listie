import { SimpleRest } from 'meteor/simple:rest'
import { JsonRoutes } from 'meteor/simple:json-routes'

// Remove all default publications
SimpleRest.configure({
  collections: []
})

// Enable cross origin requests for all endpoints
JsonRoutes.setResponseHeaders({
  "Cache-Control": "no-store",
  "Pragma": "no-cache",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
})