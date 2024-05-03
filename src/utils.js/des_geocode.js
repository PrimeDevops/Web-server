const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoidG9tY2hhcmxpZTAwNyIsImEiOiJjbHY2b25iZGEwMWh5MmtudGF2OXVvMm5xIn0.UBV8tRDZpNMrTRvFzn2zgw&limit=1'

    request({url, json: true}, (error, { body })=>{
        if(error){
            callback('Unable to connect to location services...', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find loaction. Try another search.', undefined)

        }else{
            callback(undefined, {
                latitude: body.features[0].properties.coordinates['latitude'],
                longitude: body.features[0].properties.coordinates['longitude'],
                location: body.features[0].properties.full_address
            })
        }
    })

}
/* // RE-USEABLE FUNCTION 
geocode('philadelphia New york', (error, data)=>{
    console.log('Error', error)
    console.log('Data', data)


}) */


module.exports = geocode