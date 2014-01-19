describe('Connectivity : Test', function() {

        var request, Step,
            db_response;

        beforeEach(function() {
            request = require('request');
            Step = require('step');
            db_response = 404;
        });

        it('Should be able to connect to database ', function() {

            Step(
                function one() {
                    expect(request).toBeDefined();
                },
                function two() {
                    request("mongodb://localhost/localMongoDB'", this);
                },
                function three(req, res, body) {
                	   // console.log(res);
                    expect(res.statusCode).toEqual(200);
                });

        });
    });
