const express = require('express')
const app = new express()

const cors = require('cors')
app.use(cors())


app.use(express.static(__dirname + '/dist/menbarbers'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/menbarbers/index.html')
})

const reservation = require('./routes/reservation')
const style = require('./routes/style')
const user = require('./routes/user')

app.use('/reservation',reservation)
app.use('/style',style)
app.use('/user',user)

const PORT = process.env.PORT||80

app.listen(PORT,(err)=>{
    console.log(`server running at localhost:${PORT}`)
})




