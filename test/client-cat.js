var assert = require('chai').assert,
  superagent = require('superagent');


describe("Create Cat", function () {


  var domain = "http://localhost:3000";

  var json = [{


    "name": "Ogłupiały",
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
    "describe": "bla bla bla bla bla bla bla bla ka ka ka ka ta ta ta ta"


  }];


  it('POST data to create a cat', function (done) {


    superagent
      .post(domain + '/api/cats')
      .send(json[0])
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .end(function (err, loginRes) {
        if (err) {
          console.error(err);
          return done(err);
        }

        console.log(loginRes.body);

        assert.equal(loginRes.status, 200);
        assert.ok(loginRes.body);

        done();


      });

  });


});
