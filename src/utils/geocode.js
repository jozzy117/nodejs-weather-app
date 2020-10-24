const got = require('got')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYnJvc2pheSIsImEiOiJja2dhczNrNzcwYTVxMnRrejVxdWtwYzF4In0.tVyyXnohnPnWZWMsp_oSGQ&limit=1'

    got({url, responseType: 'json'})
    .then(({body})=>{

        if (body.features.length === 0){
            callback('Unable to find location. Try another search', undefined)
        }else{ 
            callback({
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }, undefined)
        }
    })
    .catch((error)=>{
        if(error){
            callback(undefined, 'Unable to connect to weather service!')
        }
    })

}

module.exports = geocode