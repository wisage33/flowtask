import express from "express";
import serverRouter from './routes/server.js'
import connectDB from "./config/db.js";
import "dotenv/config"
import authRouter from './routes/authRouter.js'

const app = express();
const port = 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use('/auth/', authRouter)
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

app.get('/register', (req, res) => {
    res.render('register', {title: 'Registration'})
})

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
})
