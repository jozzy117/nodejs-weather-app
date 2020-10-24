const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Jonathan Ojakovo'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Jonathan Ojakovo'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        name: 'Jonathan Ojakovo',
        helpText: 'Help is coming soon'
    })
})

app.get('/weather', (req, res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, ({longitude,latitude,location} = {},error)=>{
        if(error){
            return res.send({error})
        }

        forecast(longitude, latitude, (forecastData, error)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/help/*', (req, res)=>{
    res.render('404-page', {
        errorMsg: 'Help article not found',
        name: 'Jonathan Ojakovo',
        title: '404'
    })
})

app.get('*', (req, res)=>{
    res.render('404-page', {
        errorMsg: 'Page not found',
        name: 'Jonathan Ojakovo',
        title: '404'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})