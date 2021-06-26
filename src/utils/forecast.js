const request = require('request')

const forecast = (longitude,latitude, callback)=>{

    const url = 'http://api.weatherstack.com/current?access_key=d393cf6750be7adc5d46ce2701a2d2f3&query=' + longitude+','+latitude
    
    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }else if (body.error){
            console.log('Unable to find location')
        }else {
            
                callback(undefined,body.current.weather_descriptions[0] + ' It is currently '+ body.current.temperature+' And it feels like '+ body.current.feelslike + ' Degrees out and th humidity is '+body.current.humidity)
                
        
        }
    })
}

module.exports = forecast

