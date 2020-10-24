const got = require('got')

const forecast = (lon, lat, callback)=>{
    const url = 'http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=77e18dc8ff9ccb2a1b5614788fdffbf2&units=metric'
    got({url, responseType:'json'})
    .then(({body})=>{
        callback( body.current.weather[0].description + ', the current temperature is ' + body.current.temp + ' degree. There is a ' + body.daily[0].pop + ' percent chance of rain.', undefined)
    })
    .catch((error)=>{
        if (error.response){
            callback(undefined, 'Unable to find location. Try another search')
        }else{
            callback(undefined, 'Unable to connect to Weather service')
        }
    })
}

module.exports = forecast