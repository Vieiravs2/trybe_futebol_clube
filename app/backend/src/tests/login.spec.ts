import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import allTeams from './mocks/allTeams';
import { app } from '../app';
import JWT from '../utils/JWT';
import { sign } from 'jsonwebtoken';
import Users from '../database/models/users.model';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota /login', function () { 
  beforeEach(function () { sinon.restore(); });

  it('Testa se o login é efetuado com sucesso caso o usuário e senha estejam corretos', async function () {
    const mock = { email: "admin@admin.com", password: "secret_admin"}
    const mockPasswordWithBcrypt = { email: "admin@admin.com", password: "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"}
    sinon.stub(Users, "findOne").resolves(mockPasswordWithBcrypt as any)
    sinon.stub(JWT, "sign").returns("token")
    const response = await chai.request(app)
      .post('/login').send(mock)
    
    expect(response.body).to.deep.equal({ token: "token" })
    expect(response.status).to.be.equal(200)
  });

  it('Testa se retorna um erro caso o email esteja inválido', async function () {
    const mock = { email: "admin@admin.com", password: "secret_user"}
    const response = await chai.request(app)
      .post('/login').send(mock)
    
    expect(response.body).to.deep.equal({ message: "Invalid email or password" })
    expect(response.status).to.be.equal(401)
  });

  it('Testa se retorna um erro caso o email não esteja presente no corpo', async function () {
    const mock = { password: "secret_user"}
    const response = await chai.request(app)
      .post('/login').send(mock)
    
    expect(response.body).to.deep.equal({ message: "All fields must be filled" })
    expect(response.status).to.be.equal(400)
  });

  it('Testa se retorna um erro caso a senha não esteja presente no corpo', async function () {
    const mock = { user: "admin@admin.com"}
    const response = await chai.request(app)
      .post('/login').send(mock)
    
    expect(response.body).to.deep.equal({ message: "All fields must be filled" })
    expect(response.status).to.be.equal(400)
  });
});