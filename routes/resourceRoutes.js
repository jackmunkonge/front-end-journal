const service = require('../src/service.js');
const express = require('express');
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.get('/resources', function (req, res) {   
  service.getResources(function (json) {
    let resources = JSON.parse(json);
    console.log(resources)
    service.getLanguages(function(languages) {
      service.getFrameworks(function(frameworks) {
        res.send(resources,languages,frameworks);
      })
    })
  })
})

router.get('/resources/edit', function (req, res) {   
  service.getResources(function (json) {
    let resources = JSON.parse(json);
    service.getLanguages(function(languages) {
      service.getFrameworks(function(frameworks) {
        res.render('editresource', {resources, languages, frameworks},)
      })
    })
  })
})

router.get('/resources/create', function (req, res) {
  service.getLanguages(function(languages) {
      service.getFrameworks(function(frameworks) {
        res.render('resourceform', {languages, frameworks});
      })
    })
  })

router.post('/resources/create', function(req, res) {
  service.createResource(req, function(message) {
   res.send(message);
  });
});

router.post('/resources/edit',function(req, res){
  let newResources = req.body.resources;
  let promises = [];
  console.log(newResources);

  for(let i = 0;i < newResources.length;i++){
    promises.push(service.updateResource(newResources[i]));
  }
  
  Promise.all(promises)
  .then(() => {
    res.redirect('/resources');
  })
  .catch(function(failure){
    console.log("Couldn't update resources");
    console.log("Error: " + failure);
    res.sendStatus(failure);
  })
});


module.exports = router;