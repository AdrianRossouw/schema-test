var data = require('data'),
    schema = require('schema'),
    amanda = require('amanda'),
    JSV = require('jsv').JSV,
    _ = require('underscore')._;

var env = JSV.createEnvironment('json-schema-draft-03');



describe('JSV env.validate', function() {
    it('valid data', function(done) {
        var report = env.validate(data.valid, schema);
        done(!!report.errors.length);
    });
    it('invalid data', function(done) {
        var report = env.validate(data.invalid, schema);
        console.log(report.errors);
        done(!report.errors.length);
    });
});

describe('JSV mapping properties', function() {
    var schemaInstance = env.createSchema(schema);
    var properties = schemaInstance.getAttribute('properties');

    var mapErrors = function(v, k) {
        var err;
        if (!properties[k]) return;
        if (err = properties[k].validate(v).errors.pop()) {
            var prop = env.findSchema(err.schemaUri).getValue();
            if (prop.description) {
                return prop.description;
            } else {
                return err.message + ' (' + k + ')';
            }
        }
    } 

    it('valid data', function(done) {
        var error = _(data.valid).chain()
            .map(mapErrors)
            .compact()
            .last()
            .value();
        done(!!error);
    });

    it('invalid data', function(done) {
        var error = _(data.invalid).chain()
            .map(mapErrors)
            .compact()
            .last()
            .value();
        console.log(error);
        done(!error);
    });

});

describe('JSV schemaInstance.validate', function() {
    var schemaInstance = env.createSchema(schema);
    it('valid data', function(done) {
        var report = schemaInstance.validate(data.valid);
        done(!!report.errors.length);
    });
    it('invalid data', function(done) {
        var report = schemaInstance.validate(data.invalid);
        console.log(report.errors);
        done(!report.errors.length);
    });
});

describe('Amanda', function() {
    it('valid data', function(done) {
        amanda.validate(data.valid, schema, function(err) {
            done(err);
        });
    });
    it('invalid data', function(done) {
        amanda.validate(data.invalid, schema, function(err) {
            console.log(err.getMessages());
            done(!err);
        });
    });

});
