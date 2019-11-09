const express = require('express')
const app = new express()

const cors = require('cors')
app.use(cors())

app.use(express.static(__dirname + '/dist/menbarbers'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/menbarbers/index.html')
})

const stylist = require('./routes/stylist')
const client = require('./routes/client')
const reservation = require('./routes/reservation')
const style = require('./routes/style')

app.use('/stylist',stylist)
app.use('/client',client)
app.use('/reservation',reservation)
app.use('/style',style)

const PORT = process.env.PORT||80

app.listen(PORT,(err)=>{
    console.log(`server running at localhost:${PORT}`)
})




