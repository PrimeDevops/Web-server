const request = require('request')

const forecast = (latitude, longitude, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=19e7bb4782f29d09805cad896fc3284e&query=' + latitude + ',' + longitude + '37.8267,-122.4233&units=f'
                 //http://api.weatherstack.com/current?access_key=19e7bb4782f29d09805cad896fc3284e&query=&units=f

    request({url, json: true}, (error, {body})=>{
        if(error) {
            callback('Unable to connect to weather service...', undefined)

        }else if (body.error)  {
            callback('Unable to find location', undefined)

        } else {
            //console.log(body.current.weather_descriptions[0])
            //callback(undefined, body.current.weather_descriptions[0] + ". it's currently " + body.current.temperature + ' degrees out. ' + 'there is a ' + body.current.feelslike + '% chance of rain. ' )
            callback(undefined, body.current.weather_descriptions[0] + ". it's currently " + body.current.temperature + ' degrees out. ' + 'it feels like ' + body.current.feelslike + 'degrees out. The humidity is ' + body.current.humidity + '%.'  )

        }
    })



}

module.exports = forecast