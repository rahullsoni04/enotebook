const dbCon = require("./conn");
const express = require('express')
const app = express()

dbCon()
const port = 5000

app.use(express.json())
app.use('/api/auth',require('./routes/auth.js'))
app.use('/api/notes',require('./routes/notes.js'))

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Notes app listening on port ${port}`)
})