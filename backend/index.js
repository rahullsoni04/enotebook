const dbCon = require("./conn");
const express = require('express')
const cors = require('cors')
const app = express()


dbCon()
const PORT = process.env.PORT

app.use(cors())

// Set the Access-Control-Allow-Origin header to allow requests from any domain
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   next();
// });



app.use(express.json())
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Notes app listening on port ${PORT}`)
})