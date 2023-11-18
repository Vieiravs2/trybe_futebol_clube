import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import allMatches from './mocks/allMatches';
import { app } from '../app';
import MatchesService from '../services/matches.services';
import MatchesModel from '../database/models/matches.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /matches', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Testa se a função getAllMatches retorna todas as partidas', async function () {
    sinon.stub(MatchesModel, "findAll").resolves(allMatches as any);

    const response = await chai.request(app)
      .get('/matches')

    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(allMatches);
  });
});