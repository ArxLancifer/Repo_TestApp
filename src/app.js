const path = require('path');
const express =require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));
//console.log(path.join(__dirname,'..'))testing views**
const app = express();

const port = process.env.PORT || 3000;
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials');
//app.set('views', path.join(__dirname, '../views')) //testing views**
//Setump handlebars engine views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath));

//Setup static directory to serve
app.get('', (req, res)=>{
    res.render('index', {
        title:'Weather App',
        name:'Anestis'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title:'About me',
        name:'Anestis Raziel'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title:"Help Center",
        _option:"How could i help you",
        name:'Anestis'
    })
})
// app.get('', (req, res)=>{
// res.send('<h1 style="color:blue">Hellow express!</h1>')
// });

// app.get('/help', (req, res)=>{
//     res.send([{
//         name:'Anestis',
//         age:30
//     },
//     {
//         like:"none",
//         nickname:"Raziel"
//     }
// ])
// });

// app.get('/about', (req, res)=>{
//     res.send('<h1 style="color:grey; text-align:center"><b><i>About page!</b></i></h1>')
// });

app.get('/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

        geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
            if(error){
                return res.send({error})
            }
            forecast(latitude, longitude, (error, forecastData)=>{
                if (error){
                    return res.send({error})
                }
               res.send({
                   forecast: forecastData,
                   location,
                   address:req.query.address
               }) 
            })
        })
})

app.get('/products', (req, res)=>{
    if (!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*',(req, res)=>{
    res.render('err_404', {
        title: '404 Help',
        name:"Anestis Raziel",
        errorMessage:"Help article not found" 
    })
})

app.get('*',(req, res)=>{
    res.render('err_404', {
        title:'404',
        errorMessage:"Page not found",
        name:"Anestis Raziel"
    })
})


console.log(process.env)
// app.listen(3000, ()=>{
//     console.log('Server is running on port 3000.')
// });
app.listen(port, ()=>{
    console.log('Server is running on port 3000.')
});

//section 8 lecture 6 