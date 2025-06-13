import express, { application } from 'express';


const app = express();

//connect to mongodb

const dbURI = 'mongodb+srv://piyush:test1234@cluster0.w93cmfv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
app.get('/', (req, res) => {
  res.send('')
})
app.get('/about-us', (req, res) => {
  res.send('<p>hello it works</p>');
})


app.get('/home')

app.listen(5000);