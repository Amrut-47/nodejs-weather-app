const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port  = process.env.PORT || 5000;

// Define paths for express config
const PublicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(PublicDirectoryPath))


app.get('/',(req, res)=>{
    res.render('index',{
        title: 'Weather Information',
        name:'Amrut Netaji Khot '
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:"This is About page",
        name:'Amrut Netaji Khot ',
        address:'A/P. Randeviwadi'
    })
})


// Main  work is here...


app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error:'You must provide address term..!'
        })
    }

    geocode(req.query.address,(error,{ latitude,longitude,location } = {})=>{
        if (error){
            return res.send({ error })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({ 
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })

})


app.get('/products',(req, res)=>
{
    if (!req.query.search){
        return res.send({
            error:'You must provide search term..!'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})


app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help',
        helpText:'This is some helpful text..!',
        name:'Amrut Netaji Khot '
    })
})


app.get('/help/*',(req, res)=>
{
    res.render('404',{
        errorMessage:"Help page not Found..!"
    })
})


app.get('*',(req, res)=>
{
    res.render('404',{
        errorMessage:"Error 404.... Page could not be found..!  ):"
    })
})

app.listen(port,()=>{
    console.log("listening from port "+port)
})
