const express = require('express');
const Knex = require('knex');
const path = require('path');
var fs = require('fs')
const {Storage} = require('@google-cloud/storage');
var cors = require('cors');
const app = express();
app.enable('trust proxy');
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname+'/hotdog/dist/hotdog'));

var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

const storage = new Storage({
    projectId: 'eu.artifacts.crud-249315.appspot.com',
    keyFilename: path.join(__dirname,"./keyfile.json")
})

var BUCKET_NAME = 'crud-249315.appspot.com'
var myBucket = storage.bucket(BUCKET_NAME);

const connect = () => {
  const config = {
    user: 'root',
    password: 'password',
    database: 'hotdogs',
  };
  if (
      'crud-249315:us-central1:hotdogs' &&
      process.env.NODE_ENV === 'production'
  ) {
    config.socketPath = '/cloudsql/crud-249315:us-central1:hotdogs';
  }
  // Connect to the database
  const knex = Knex({
    client: 'mysql',
    connection: config,
  });
  return knex;
};
const knex = connect();
const getVisits = async knex => {
  const results = await knex.select().from('hotdogs');
  return results.map(hotdog => {
        return hotdog;
      }
  );
};

app.get('/list', async (req, res, next) => {
 
const result = await getVisits(knex);
    try{
        res
            .status(200)
            .send(result);
    }catch (err) {
        res.json({
            status:400,
            message:err
        })
    }
});


app.get('/del/:id', async (req, res, next) => {
 
  const result = await knex('hotdogs')
      .where('id', req.params.id )
      .del();
  try{
      res.json({
        status:200,
        message:result
      })
  }catch (err) {
      res.json({
          status:400,
          message:err
      })
  }
});

app.post( '/upload', upload.any(), function( req, res, next ) {
       const filepath = req.files.map(function(file) {
        return file.path; // or file.originalname
    });
    myBucket.upload( filepath[0], function (err, file) {
        if (err) throw new Error(err);
        console.log(file.name);
    });
    const filenames = req.files.map(function(file) {
        return file.filename; // or file.originalname
    });
    console.log(req.files);
    res.send(filenames);
});

app.post('/add', async (req, res, next) => {
console.log(req.body)
    const result = await knex('hotdogs').insert(req.body);
    try{
        res.json({
            status:200,
            message:result
        })
    }catch (err) {
        res.json({
            status:400,
            message:err
        })
    }
});


app.post('/update', async (req, res) => {
  const result = await knex('hotdogs')
      .update({
        name: req.body.name,
        title:  req.body.title,
        description: req.body.description,
        image: req.body.image,
      })
      .where('id', req.body.id);
    try{
        res.json({
            status:200,
            message:result
        })
    }catch (err) {
        res.json({
            status:400,
            message:err
        })
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
