const request = require('request')

const forecast = (latitude, longitude, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=19e7bb4782f29d09805cad896fc3284e&query=' + latitude + ',' + longitude + '37.8267,-122.4233&units=f'
                 //http://api.weatherstack.com/current?access_key=19e7bb4782f29d09805cad896fc3284e&query=&units=f

    request({url: url, json: true}, (error, response)=>{
        if(error) {
            callback('Unable to connect to weather service...', undefined)

        }else if (response.body.error)  {
            callback('Unable to find location', undefined)

        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". it's currently " + response.body.current.temperature + ' degrees out. ' + 'there is a ' + response.body.current.feelslike + '% chance of rain. ' )

        }

    })



}

module.exports = forecast