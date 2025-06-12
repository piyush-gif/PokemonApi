import express, { application } from 'express';


const app = express();

app.get('/about-us', (req, res) => {
  res.send('<p>hello it works</p>');
})


app.get('/home')

app.listen(5000);