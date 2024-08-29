import express from 'express'; //allows http requests
import bodyParser from 'body-parser';  //allows us to take in an incoming request body
import groceryRoutes from './routes/groceries.js' //see groceries.js file below
import cors from 'cors';

const app = express();
const PORT = 5000 //this is the port we will be listening on

app.use(cors());
app.use(bodyParser.json());
app.use('/groceries', groceryRoutes); //specify the path and router handler

app.get('/', (req, res) => {
    res.send('HELLO FROM HOMEPAGE');
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));