const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(__filename)

console.log(path.join(__dirname,'../public'))

//Define paths for Express Config
const publicDirPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//initialize your application to express
const app = express()

const port = process.env.PORT || 3000

//Setup handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)
//Register partials dir
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))


//app.get method is used for setting up route
//get method will take 2 arguments
//1st arg: route
//2nd arg: a func that takes 2 arg, 1st is req:containing request info, 2nd is response
// app.get('',(req,res) => {
//     //res.send("Hello Express!!!!")
//     res.send("<h1>Hello Express!!!</h1>")
// })

// app.get('/help',(req,res) =>{
//     //res.send("Help page")
//     res.send([{
//         name: 'Shweta',
//         age:23
//     },{
//         name: 'Pooja',
//         age:23
//     }])
// })

// app.get('/about',(req,res) => {
//     //res.send("About Page!")
//     res.send("<h2>About!!!</h2>")
// })

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Shweta'
    })
})
 
app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help Page',
        message: 'Help message',
        name: 'Shweta'
    })
})

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Shweta Moharil'
    })
})

app.get('/weather',(req,res) => {
    //res.send("Weather info")
    if(!req.query.address) {
        return res.send({
            error: 'Please specify the address'
        })
    }

    geocode(req.query.address, (error , {latitude, longitude, place_name} = {}) => { //default value
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude , (error, forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                place_name,
                address: req.query.address
            })
        })
    })
    // console.log(req.query.address)
    // res.send({
    //     address: req.query.address,
    //     location: 'Nashik',
    //     forecast: 'It is raining'
    // })
})

// app.get('/products', (req,res) => {
//     if(!req.query.search) {
//        return res.send({
//             error: 'You must specify the search'
//         })
//     }
//     console.log(req.query)
//     res.send({
//         product: '[]'
//     })
// })

app.get('/help/*',(req,res) => {
    //res.send("Help page 404 error")
    res.render('404',{
        title: 'Error',
        name: 'Shweta',
        errorMessage: 'Help Article not found'
    })
})

app.get('*',(req,res) => {
   // res.send("My 404 page!!")
   res.render('404',{
       title: 'Error',
       name: 'Shweta',
       errorMessage: 'Page not found'
   })
})


//We need to start the server
app.listen(port,() => {
    console.log("Server is up and running on port "+port)
})