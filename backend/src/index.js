import  express  from "express";
import notesRoute from './routes/notes.routes.js'
import categoriasRoute from './routes/categorias.routes.js'
import cors from 'cors'
import { PORT } from "../config.js";
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    }
));
app.use('/api/',notesRoute)
app.use('/api', categoriasRoute)
app.listen(PORT);
console.log('server runing on port: ' + PORT + '')
