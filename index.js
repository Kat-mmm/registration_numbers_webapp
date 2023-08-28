import express from 'express';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';
import flash from 'express-flash';
import session from 'express-session';
import RegistrationNumbers from './reg_numbers.js';
import RegNumbersRoutes from './routes/registration.js';
import pgPromise from 'pg-promise';
import 'dotenv/config';
import RegNumbersDatabase from './services/reg_numbers.database.js';

const username = 'postgres';
const password = process.env.Password;
const host = 'localhost';
const port = 5432;
const databaseName = 'reg_testdb';

const encodedUsername = encodeURIComponent(username);
const encodedPassword = encodeURIComponent(password);

const connection = process.env.DATABASE_URL || `postgresql://${encodedUsername}:${encodedPassword}@${host}:${port}/${databaseName}`;

const db = pgPromise()(connection);

let app = express();
let regFactory = RegistrationNumbers();
let regNumberdb = RegNumbersDatabase(db);
let regNumbersRoutes = RegNumbersRoutes(regNumberdb, regFactory);

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

app.get('/', regNumbersRoutes.index)

app.get('/reg_number/:reg_number', regNumbersRoutes.getRegistration)

app.post('/reg_numbers', regNumbersRoutes.addRegistration)

app.post('/reg_numbers/filter', regNumbersRoutes.filterRegs)

app.post('/reg_numbers/clear', regNumbersRoutes.deleteRegs)

let PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
    console.log('App running on port ' + PORT);
})
