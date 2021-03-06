const request = require('postman-request');


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3945fdfb0c05297b5d120f440abc302f&query=' + latitude + ',' + longitude + '&units=m'
    

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out. The Humidity is " + response.body.current.humidity +"")
        }
    })
}

module.exports = forecast