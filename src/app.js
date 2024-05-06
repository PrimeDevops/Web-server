const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils.js/des_geocode')
const forecast = require('./utils.js/des_forecast')

const port = process.env.PORT || 3000    

/* console.log(__dirname)
//console.log(__filename)
console.log(path.join(__dirname, '..')) */

const app = express()

// define path for expresss config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// set up handlebars engine and view location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve 
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App - get daily forecast',
        name: 'Harvey Dent'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About Dog',
        name: 'Tom Hardy'
    })
})

app.get('/help',(req, res)=>{
    res.render('Help', {
        helpText: 'demo text - use here',
        title: 'Please HELP',
        name: 'provide assistance'
    })
})

app.get('/footer', (req, res)=>{
    res.send('footer', {
        footer: 'this is the footer',
        name: "developer's Name"
    })
})

/* app.get('', (req, res)=>{
    res.send('<h1>Weather</h1>')    // serving up HTML

}) */

//app.get('/help', (req, res)=>{
   /*  res.send({                     // JSON OBJECT 
        Name: 'Charles',
        Age: 1000
    }) */
    /* res.send([{                     // JSON OBJECT 
        Name: 'Charles',
        Age: 1000
    },{
        Name: 'Harvey',
        occupation: 'detective'
        
    }])
})


app.get('/about',(req, res)=>{
    // res.send('make any enquires, contact us')
    res.send('<p>Hello world...</p>')
}) */


app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Kindly provide an address..'
        })

    }

    geocode(req.query.address, (error, {latitude, longitude, location } = {})=>{
        if(error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if (error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location, 
                address: req.query.address
            })
        })

    })
    //res.send('daily weather forecast')
   /*  res.send({
        forecast: "It's snowing",
        location: 'Boston',
        address: req.query.address
    }) */
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({  // the function below isn't going to run
            error: 'you must provide a search term...'
        })
    }

    console.log(req.query.search)
    res.send({
        products:  []
    })
})




app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'detective Gordon',
        errorMessage: 'Help article not found'
    })
    //res.send('Help article not found..')

})

// ethically this should come last 
/* app.get('*', (req, res)=>{
    res.send('Error - 404 [page not found]')


}) */

app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: "detective",
        errorMessage: "oh oh.. page not found..."

    })

})




/* app.listen(3000, ()=>{
//app.listen(port, ()=>{   SUPPOSE TO BE
    console.log('Server is up on port 3000...')
    //console.log('Server is up on port ' + port)   SUPPOSE TO BE
}) */


app.listen(port, ()=>{
    console.log('Server is up on ' + port)
})