const request=require('request')

const forecast=(lat,lon,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=c6890419bc3f0431f9e64710b0221c09&query='+lat+','+lon+'&limit=1'
    request({url, json:true},(error,{body}={})=>{
        if(error){
            callback('unable to connect to weather services',undefined)
        }else if(body.error){
            callback('unable to connect to location services',undefined)
        }else{
            callback(undefined,body.current.weather_descriptions[0] +'. Current temp is '+body.current.temperature+' but it feels like '+body.current.feelslike)
        }
    })
}

module.exports=forecast