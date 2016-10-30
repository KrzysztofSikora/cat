var assert = require('chai').assert,
  superagent = require('superagent');


describe("Create Cat", function () {


  var domain = "http://localhost:3000";

  var json = [{


    "name": "Ogłupiałyy",
    "color": "red",
    "age": 10,
    "friendly": true,
    "catAddress": {
      "location": {
        "lat": 50.0913671,
        "lng": 20.0112781
      },
      "city": "Kraków"
    },
    "describe": "bla bla bla bla bla bla bla bla ka ka ka ka ta ta ta ta",
     "ownerId": "57f53fa8179ae11a9aaa1128"

  }];


  it('POST data to create a cat', function (done) {


    superagent
      .post(domain + '/api/cats')
      .send(json[0])
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function (err, resJSON) {
        if (err) {
          console.error(err);
          return done(err);
        }

        console.log(resJSON.body);

        assert.equal(resJSON.status, 200);
        assert.ok(resJSON.body);

        done();


      });

  });

  it('GET data to find a cat', function (done) {


    superagent
      .get(domain + '/api/cats')
      .send()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function (err, resJSON) {
        if (err) {
          console.error(err);
          return done(err);
        }

        console.log(resJSON.body);

        assert.equal(resJSON.status, 200);
        assert.ok(resJSON.body);

        done();


      });

  });

});
