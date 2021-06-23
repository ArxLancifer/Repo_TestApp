const request = require('request');

const url = 'http://api.weatherstack.com/current?access_key=d393cf6750be7adc5d46ce2701a2d2f3&query=37.8267,-122.4233';

request(url, (error,response, body)=>{
    const data = JSON.parse(response.body)
    
    console.log(body)
    console.log(data)
})