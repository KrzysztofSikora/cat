'use strict';

var geocoder = require('geocoder');
var gramophone = require('gramophone')
var app = require("../../server/server");



module.exports = function(Cat) {
/// GET without value
  Cat.friendly = function (cb) {
    Cat.find({where: {friendly: true}}, function (err, res) {
      cb(err, res)
    })

  }

  Cat.remoteMethod('friendly', {
    http: {path: '/friendly', verb: 'get'},
    returns: {arg: 'friendlycats', type: 'array'}
  });

///// !GET without value


/// GET with value

  Cat.remoteMethod('friendly', {
    http: {path: '/friendlylog', verb: 'get'},

    accepts: {arg: 'friendlycats', type: 'string'},


    returns: {arg: 'friendlycats', type: 'array'}
  });

  Cat.friendly = function (friendlycats, cb) {
    console.log(friendlycats)
    return cb(null, friendlycats);
  }


/// !GET with value


/// POST
  Cat.remoteMethod("cos", {
    http: {path: '/all', verb: "post"},
    accepts: [{
      arg: "dataPost",
      type: "any",
      description: "",
      http: {source: "body"}
    }
    ],
    returns: {arg: "data", type: "array", description: "Array full of users"},
    description: "Find all instances of the base User model no mater what the role user have."
  });

  Cat.cos = function (credentials, cb) {

    console.log(dataPost)
    return cb(null, dataPost);
  }

// !POST


  Cat.remoteMethod("dodaj", {
    http: {path: '/dwa', verb: "post"},
    accepts: [{
      arg: "dataPost",
      type: "any",
      description: "",
      http: {source: "body"}
    }
    ],
    returns: {arg: "data", type: "array", description: "Array full of users"},
    description: "Find all instances of the base User model no mater what the role user have."
  });

  Cat.dodaj = function (dataPost, cb) {


    Cat.update({friendly: true},{name: dataPost.name}, function (err, res) {

      cb(err, res)
    })
  }



  // method is run before data
  //

  Cat.beforeRemote("create", function (ctx, modelInstance, next) {

    var Owner = app.models.Owner;


    Owner.findById(ctx.args.data.ownerId).then(function (model) {
      console.log('2');

      console.log(model)


      next()
    }).catch(function (err) {
      console.log(err)

    });

    console.log(gramophone.extract(ctx.args.data.describe))
    //
    ctx.args.data.words = gramophone.extract(ctx.args.data.describe)
    console.log('zapisane do words')


    geocoder.reverseGeocode(ctx.args.data.catAddress.location.lat, ctx.args.data.catAddress.location.lng, function (err, data) {
      ctx.args.data.catAddress.city = data.results[0].address_components[3].long_name;

      ctx.args.data.metaCat = ctx.args.data.words + " " + ctx.args.data.catAddress.city + " "
      // next()
      // data up
    });

  })


  Cat.remoteMethod(
    'searchByIndex',
    {
      http: {path: '/search/:query', verb: 'GET'},
      accepts: {arg: 'query', type: 'string', http: {source: 'path'}},
      returns: {root: true, type: 'object'},
    }
  );

  Cat.searchByIndex = function (query, cb) {

    //db.Cat.createIndex({"metaCat":"text"})
    // db.Cat.find({$text: {$search: "bla"}})
    console.log(query)
    Cat.find({ where: { '$text': { search: query } }  }, function (err, res) {
      console.log(res)
      return cb(err, res);
    })

  }

/////////////////////
  Cat.remoteMethod('search', {
    http: {path: '/search', verb: 'get'},

    accepts: [{arg: "name", type: "string"},
      {arg: "color", type: "string"},

      {arg: "words", type: "string"},
    ],

    returns: [{arg: "name", type: "string"},
      {arg: "color", type: "string"},
      {arg: "words", type: "string"}
    ]
  });


  Cat.search = function (name,color, words, cb) {

    Cat.find(
      {
        where: {
          and: [
            {name: name}, {color: color},
            {words: words}
          ]
        }

      }, function (err, res) {
        console.log(res)
        return cb(err, res);
      })
    // console.log(userLocation)
  }




};
