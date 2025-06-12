import express from 'express';


const app = express();



app.get('/about-us', (req, res) => {
  res.send('<p>hello it works</p>');
})


app.listen(9000);