'use strict';

var geocoder = require('geocoder');
var gramophone = require('gramophone')




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


    console.log(gramophone.extract(ctx.args.data.describe))
    //
    ctx.args.data.words = gramophone.extract(ctx.args.data.describe)
    console.log('zapisane do words')


    geocoder.reverseGeocode(ctx.args.data.catAddress.location.lat, ctx.args.data.catAddress.location.lng, function (err, data) {
      ctx.args.data.catAddress.city = data.results[0].address_components[3].long_name;


      next()
      // data up
    });

  })




};
