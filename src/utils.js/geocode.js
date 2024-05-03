const request = require('request')

/* const geocode = (address, callback) =>{

    //const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=Los%20Angeles&access_token=pk.eyJ1IjoidG9tY2hhcmxpZTAwNyIsImEiOiJjbHY2b25iZGEwMWh5MmtudGF2OXVvMm5xIn0.UBV8tRDZpNMrTRvFzn2zgw&limit=1'
    //const url = 'https://api.mapbox.com/search/geocode/v6/forward?' + encodeURIComponent(address) + 'access_token=pk.eyJ1IjoidG9tY2hhcmxpZTAwNyIsImEiOiJjbHY2b25iZGEwMWh5MmtudGF2OXVvMm5xIn0.UBV8tRDZpNMrTRvFzn2zgw&limit=1'

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidG9tY2hhcmxpZTAwNyIsImEiOiJjbHY2b25iZGEwMWh5MmtudGF2OXVvMm5xIn0.UBV8tRDZpNMrTRvFzn2zgw&limit=1'

        
        request({url: url, json: true},(error, response)=>{
            if(error){
                callback('Unable to connect to location services...', undefined)
            }else if(response.body.features.length === 0){

                callback('Unable to find location, Try another search', undefined)
            } else {
                //callback('failure', undefined)
                /* callback(undefined,{
                    latitude: response.body.features[0].coordinates['latitude'],
                    longitude: response.body.features[0].coordinates['longitude'],
                    location: response.body.features[0].coordinates['place_formatted']
                }) */ // LOOK HERE ->
                /*(callback(undefined,{
                latitude: response.body.features[0].properties.coordinates['latitude'],
                longitude: response.body.features[0].properties.coordinates['longitude'],
                location: response.body.features[0].properties.full_address
                   

                })
                    
            }
        })
  
}

module.exports = geocode */




const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoidG9tY2hhcmxpZTAwNyIsImEiOiJjbHY2b25iZGEwMWh5MmtudGF2OXVvMm5xIn0.UBV8tRDZpNMrTRvFzn2zgw&limit=1'

    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback('Unable to connect to location services...', undefined)
        }else if(response.body.features.length === 0){
            callback('Unable to find loaction. Try another search.', undefined)

        }else{
            callback(undefined, {
                latitude: response.body.features[0].properties.coordinates['latitude'],
                longitude: response.body.features[0].properties.coordinates['longitude'],
                location: response.body.features[0].properties.full_address
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