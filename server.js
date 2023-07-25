import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(__dirname + '/'));

app.listen(3000, () => {
    console.log("Server is listening at 3000");
});

app.get('/', (req, res) => {
    res.render('index.html');
});

app.get('/calc', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const opr = req.query.opr || 'add';
    const response = { statusCode: 200, message: 'success'};
    const errorResponse = { statusCode: 403, message: 'Invalid input' }
        if (num1 && num2) {
            if(opr=='sub'){
                res.send({...response, data: num1 - num2});
            } else if(opr==='mul') {
                res.send({...response, data: num1 * num2});
            } else if(opr==='div') {
                (num2 !== 0) ?  res.send({...response, data: num1 / num2}) : res.send(errorResponse);
            } else {
                res.send({...response, data: num1 + num2});
            }
        } else {
            res.send(errorResponse)
        }
        res.end();
});