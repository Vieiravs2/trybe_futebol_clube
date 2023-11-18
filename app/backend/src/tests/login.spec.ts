import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import allTeams from './mocks/allTeams';
import { app } from '../app';
import JWT from '../utils/JWT';
import { sign } from 'jsonwebtoken';
import Users from '../database/models/users.model';
import LoginService from '../services/login.services';

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

  it('Testa se retorna um erro caso o email não esteja presente no corpo', async function () {
    sinon.stub(Users, "findOne").resolves();
    const objPass = { password: 'secret_admin' }

    const response = await chai.request(app)
      .post('/login').send(objPass)

    expect(response.body).to.deep.equal({ message: 'All fields must be filled' })
    expect(response.status).to.be.equal(400)
  });

  it('Testa se retorna um erro caso a senha não esteja presente no corpo', async function () {
    sinon.stub(Users, "findOne").resolves();
    const objPass = { email: 'admin@admin.com' }

    const response = await chai.request(app)
      .post('/login').send(objPass)

    expect(response.body).to.deep.equal({ message: 'All fields must be filled' })
    expect(response.status).to.be.equal(400)
  });

  it('Testa se retorna um erro caso o email esteja inválido', async function () {
    const objPass = { email: 'admin@user.com', password: 'secret_admin' }

    const response = await chai.request(app)
      .post('/login').send(objPass)

    expect(response.body).to.deep.equal({ message: 'Invalid email or password' })
    expect(response.status).to.be.equal(401)
  });

  it('Testa se retorna um erro caso a senha seja menor que 6 caracteres', async function () {
    const objPass = { email: 'admin@admin.com', password: 'user' }

    const response = await chai.request(app)
      .post('/login').send(objPass)

    expect(response.body).to.deep.equal({ message: 'Invalid email or password' })
    expect(response.status).to.be.equal(401)
  });

  it('Testa se retorna o role correto presente no banco de dados', async function () {
    sinon.stub(Users, "findOne").resolves();
    sinon.stub(JWT, "verifyToken").returns({ email: "admin@admin.com"});
    const result = await LoginService.role('admin@admin.com')

    const response = await chai.request(app)
      .get('/login/role')
      .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTcwMDM0NDU5NCwiZXhwIjoxNzAwNDMwOTk0fQ.g8cefxOUPVgybK2Z2fYTnx42HqYsCXeM54T2HnmjHLE")

    expect(result.status).to.be.equal(200)
  });
});