var express = require("express")
var app = express();

var Sequelize = require("sequelize")
var nodeadmin = require("nodeadmin")
app.use(nodeadmin(app));



//Conectare la bd
var sequelize = new Sequelize('bibliografii', 'root', '', {
    dialect:'mysql',
    host:'localhost'
})

sequelize.authenticate().then(function(){
    console.log('Success')
})

//define a new Model
var Formate = sequelize.define('formate', {
    id_format: Sequelize.INTEGER,
    name: Sequelize.STRING
})

var Citate = sequelize.define('citate', {
    id_citate: Sequelize.INTEGER,
    id_formatid: Sequelize.INTEGER,
    titlul_sursei: Sequelize.STRING,
    autor: Sequelize.STRING,
    descriere: Sequelize.STRING,
    data_aparitiei: Sequelize.DATE
})

Formate.sync();

Citate.belongsTo(Citate, {foreignKey: 'id_format', targetKey: 'id'})
//Categories.hasMany(Products)

var app = express()

app.use('/nodeamin', nodeadmin(app))

//access static files
app.use(express.static('public'))
app.use('/admin', express.static('admin'))

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies






// Get -lista cu formatele
app.get('/Formate', function(request, response) {
    Formate.findAll().then(function(formate){
        response.status(200).send(formate)
    })
        
})

// Get -categorie in functie de id
app.get('/formate/:id', function(request, response) {
    Formate.findOne({where: {id:request.params.id}}).then(function(format) {
        if(format) {
            response.status(200).send(format)
        } else {
            response.status(404).send()
        }
    })
})

//Add- format nou
app.post('/formate', function(request, response) {
    Formate.create(request.body).then(function(formate) {
        response.status(201).send(formate)
    })
})

app.put('/formate/:id', function(request, response) {
    Formate.findById(request.params.id).then(function(formate) {
        if(formate) {
            formate.update(request.body).then(function(formate){
                response.status(201).send(formate)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

//Delete - format
app.delete('/formate/:id', function(request, response) {
    Formate.findById(request.params.id).then(function(format) {
        if(format) {
            format.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})


//Get -citat
app.get('/citate', function(request, response) {
    Citate.findAll(
        {
            include: [{
                model: Citate,
                where: { id: Sequelize.col('citate.id_citate') }
            }]
        }
        
        ).then(
            function(citate) {
                response.status(200).send(citate)
            }
        )
})

//Get -citat dupa id
app.get('/citate/:id', function(request, response) {
    Citate.findById(request.params.id).then(
            function(citat) {
                response.status(200).send(citat)
            }
        )
})

//Add -citat nou
app.post('/citate', function(request, response) {
    Citate.create(request.body).then(function(citat) {
        response.status(201).send(citat)
    })
})


app.put('/citate/:id', function(request, response) {
    Citate.findById(request.params.id).then(function(citat) {
        if(citat) {
            citat.update(request.body).then(function(citat){
                response.status(201).send(citat)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})


//Delete -un citat
app.delete('/citate/:id', function(request, response) {
    Citate.findById(request.params.id).then(function(citat) {
        if(citat) {
            citat.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

//Get - citate in functie de format
app.get('/formate/:id/citate', function(request, response) {
    Citate.findAll({where:{id_format: request.params.id}}).then(
            function(citate) {
                response.status(200).send(citate)
            }
        )
})

app.listen(8080)