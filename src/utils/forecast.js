const request = require('request')

const forecast = (latitude,longitude,callback) => {

    const url ='http://api.weatherstack.com/current?access_key=a4fba585fe8fa1345e45cad94d7160ca&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'

    request({url, json:true},(error,{ body }) => {
   // request({url: url, json:true},(error,response) => {
        if(error){
            callback("Unable to connect to weather stack",undefined)
        }else if(body.error){
            callback("Unable to find the location",undefined)
        }else{
            
            callback(undefined,{
                description: body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feelslike: body.current.feelslike,
                humidity:body.current.humidity
             })
        }
    })
}

module.exports=forecast