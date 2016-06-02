import Flipper from 'flipper-rb';
import sinon from 'sinon';
import should from 'should';
import p from 'es6-promise';

const Promise = p.Promise;
const randomBoolean = () => Math.random() < .5;

describe('Flipper', ()=> {

  let server;

  beforeEach(function () {
    server = sinon.fakeServer.create();
  });

  afterEach(function () {
    server.restore();
  });

  describe('#load', () => {

    it('should return a flipper with the xhr results', (done) => {
      let features = {
        foo: randomBoolean(),
        bar: randomBoolean()
      };

      server.respondWith('GET', '/fake-url', [200, {'Content-Type': 'application/json'}, JSON.stringify(features)]);

      let eventuallyFlipper = Flipper.load('/fake-url');

      server.respond();

      eventuallyFlipper
        .then(flipper => {

          flipper.isEnabled('foo').should.equal(features.foo);
          flipper.isEnabled('bar').should.equal(features.bar);

          done();
        });

    });

    it('should return a failed promise with improper json', (done) => {
      server.respondWith('GET', '/fake-url', [200, {'Content-Type': 'application/json'}, 'not json']);

      let eventuallyFlipper = Flipper.load('/fake-url');

      server.respond();

      eventuallyFlipper
        .catch(reason => {

          reason.should.equal('Expected a JSON response from /fake-url');

          done();
        });
    });


    it('should return a failed promise with a server error', (done) => {
      server.respondWith('GET', '/fake-url', [404, {'Content-Type': 'application/json'}, 'reason']);

      let eventuallyFlipper = Flipper.load('/fake-url');

      server.respond();

      eventuallyFlipper
        .catch(reason => {
          reason.should.equal('Not Found');

          done();
        });
    });
  });

  describe('#isEnabled', () => {

    it('should properly access feature flags', () => {
      let features = {foo: randomBoolean()};
      let flipper = new Flipper(features);

      flipper.isEnabled('foo').should.equal(features.foo);
    });

    it('should default to false for unknown features', () => {
      let features = {foo: randomBoolean()};
      let flipper = new Flipper(features);

      flipper.isEnabled('bar').should.equal(false);
    });
  });


  describe('#ifEnabled', () => {

    it('should invoke the pass function iif the feature flag is enabled', () => {
      let features = {foo: true, bar: false};
      let flipper = new Flipper(features);

      var callback = sinon.spy();
      var callback2 = sinon.spy();

      flipper.ifEnabled('foo', callback);
      flipper.ifEnabled('bar', callback2);

      callback.called.should.equal(true);
      callback2.called.should.equal(false);
    });
  });


});
