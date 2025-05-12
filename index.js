import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import serverRouter from './routes/server.js'
import connectDB from "./config/db.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static(path.resolve(__dirname, 'public')))
app.set('view engine', 'ejs')

app.use(serverRouter)

app.get('/', (req, res) => {
    res.render('index', { title: 'Main page', active: 'main'})
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About', active: 'about'})
})

app.get('/tasks', (req, res) => {
    res.render('tasks', { title: 'Tasks', active: 'tasks', })
})

app.get('/users', async (req, res) => {
    try {
        res.render('users', {title: 'Users', active: 'users'})
    } catch (err) {
        console.error("Error when get users from mongo: ", err)
        res.status(500).json({ error: 'Server error'})
    }
})

app.get('/register', (req, res) => {
    res.render('register', {title: 'Registration'})
})

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
})
