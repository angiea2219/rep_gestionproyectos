import expres from 'express';
import morgan from 'morgan';
import api from './routes/areas.routes.js';
const app = expres();
app.use(morgan('dev'));
app.use(expres.json());
app.use('/',api);

app.use((req,res,next)=>{
    res.status(404).json({message:'Página no encontrada'});
});

export default app;