'use strict';

import { expect } from 'chai';
import { defaultScribes } from '../src/scribes';
import { defaultMethods } from '../src/config';
import papel, { Papel } from '../src';

describe('Default', () => {

  it('should log all methods', (done) => {
    Promise.all(
      papel.methods.map(method => {
        return papel[method]('msg');
      })
    )
      .then(() => {
        done();
      })
      .catch(done);
  });

});

describe('Manage Scribes', () => {
  var callback;

  it('should addScribe', () => {
    callback = papel.addScribe(() => {});

    expect(callback).to.be.a.function;
  });

  it('should remove scribe', () => {
    expect(callback()).to.be.a.number;
  });

});

describe('Async Scribe', () => {
  var callback;

  it('should log async', (done) => {
    callback = papel.addScribe(data => {
      return new Promise((resolve, reject) => {
        expect(data.logs.length).to.equal(10);
        resolve();
        done();
      });
    });

    papel.log(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
  });

  after(() => {
    callback();
  });

});

describe('New Instance', () => {
  var testPapel;

  before(() => {
    testPapel = new Papel({ name: 'test' });
  });

  it('should log', () => {
    expect(testPapel.log('hiii')).to.be.instanceof(Promise);
  });

  it('should have default scribes', () => {
    expect(testPapel.scribes).to.equal(defaultScribes);
  });

  it('should have default methods', () => {
    expect(testPapel.methods).to.equal(defaultMethods);
  });

});
