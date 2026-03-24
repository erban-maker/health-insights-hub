const test = require('node:test');
const assert = require('node:assert/strict');
const express = require('express');
const request = require('supertest');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const Prediction = require('../models/Prediction');
const predictionsRouter = require('../routes/predictions');

const originalFind = Prediction.find;

const makeToken = (userId, email) => jwt.sign({ sub: userId, email }, env.JWT_SECRET, { expiresIn: '1h' });

test.afterEach(() => {
  Prediction.find = originalFind;
});

test('GET /api/predictions returns only authenticated user records', async () => {
  const docsByUser = {
    userA: [
      {
        riskLevel: 'Low',
        healthScore: 82,
        predictedDiseases: ['None'],
        suggestions: ['Keep active'],
        bmi: 22.1,
        bmiCategory: 'Normal',
        categoryScores: [],
        createdAt: new Date('2026-03-01T10:00:00.000Z'),
      },
    ],
    userB: [
      {
        riskLevel: 'High',
        healthScore: 34,
        predictedDiseases: ['Hypertension'],
        suggestions: ['Consult doctor'],
        bmi: 31.4,
        bmiCategory: 'Obese',
        categoryScores: [],
        createdAt: new Date('2026-03-02T10:00:00.000Z'),
      },
    ],
  };

  Prediction.find = (query) => ({
    sort: () => ({
      limit: () => ({
        lean: async () => docsByUser[query.user] || [],
      }),
    }),
  });

  const app = express();
  app.use(express.json());
  app.use('/api/predictions', predictionsRouter);

  const userAToken = makeToken('userA', 'a@example.com');
  const userBToken = makeToken('userB', 'b@example.com');

  const responseA = await request(app)
    .get('/api/predictions')
    .set('Authorization', `Bearer ${userAToken}`)
    .expect(200);

  const responseB = await request(app)
    .get('/api/predictions')
    .set('Authorization', `Bearer ${userBToken}`)
    .expect(200);

  assert.notDeepEqual(responseA.body, responseB.body);
  assert.equal(responseA.body.length, 1);
  assert.equal(responseA.body[0].riskLevel, 'Low');
  assert.equal(responseA.body[0].healthScore, 82);

  assert.equal(responseB.body.length, 1);
  assert.equal(responseB.body[0].riskLevel, 'High');
  assert.equal(responseB.body[0].healthScore, 34);
});
