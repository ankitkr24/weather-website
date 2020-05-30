const path = require('path')
const express = require('express')
const app= express()
const hbs=require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port=process.env.PORT || 3000

app.set('views',path.join(__dirname,'../templates/views'))
app.use(express.static(path.join(__dirname,'../public')))

app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname,'../templates/partials'))


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name: 'Ankit'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Ankit'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Ankit'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { lattitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(lattitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Ankit',
        msg: "Help article not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Ankit',
        msg: "404 error"
    })
})


app.listen(port,()=>{
    console.log('server started at port '+port)
})