import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import allTeams from './mocks/allTeams';
import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

console.log('Passou aqui', __dirname);

describe('Testando a rota /teams', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Testa se a função getAllTeams retorna todos os times', async function () {
    const response = await chai.request(app)
      .get('/teams');

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(allTeams);
    expect(response.body).to.be.an('array');
  });

  it('Teste se a função findTeamById retorna o time correto', async function () {
    const response = await chai.request(app)
      .get('/teams/5');

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(allTeams[4]);
    expect(response.body).to.be.an('object');
  });
});