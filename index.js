import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import RegistrationNumbers from './reg_numbers.js';
import RegNumbersDatabase from './model/reg_numbers.database.js';

let app = express();
let regNumbersFactory = RegistrationNumbers();
let db = RegNumbersDatabase();

app.engine('handlebars', engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('./public/css'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.get('/', async function (req, res) {
    let town = regNumbersFactory.getTown();

    let addedRegNumbers = await db.getAllRegNumbers();
    let filteredRegNumbers = await db.filteredRegNumbers(town);

    // let registration_numbers = [];
    // if(town === ''){

    // }

    res.render('index', {
        registration_numbers: filteredRegNumbers || addedRegNumbers,
    })
})

app.get('/reg_number/:reg_number', async function (req, res) {
    let regNumber = req.params.reg_number;

    let chosenReg = await db.getRegistration(regNumber);

    res.render('reg_number', {chosenReg})
})

app.post('/reg_numbers', async function (req, res) {
    regNumbersFactory.setRegNumber(req.body.reg);

    const regex = /^(CA|CF|CL|CJ)\s\d{3}(-?\d{1,3})$/i;
    let regNumber = regNumbersFactory.getRegNumber();

    if(regNumber !== '' && regex.test(regNumber)){
        await db.addRegNumber(regNumber);
    }
    else{
        req.flash('error', regNumbersFactory.addRegNumber());
    }
    
    res.redirect('/')
})

app.post('/reg_numbers/filter', function (req, res) {
    let town = req.body.town;
    regNumbersFactory.setTown(town);

    res.redirect('/')
})

let PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log('App running on port ' + PORT);
})
