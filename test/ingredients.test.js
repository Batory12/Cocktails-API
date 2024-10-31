const assert = require('assert');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const ingredientsRouter = require('../routes/ingredients');

const app = express();

app.use(bodyParser.json());
app.use('/ingredients', ingredientsRouter);

describe('Cocktails API', function() {
    it('should get an ingredient by id', async function() {
            request(app)
            .get('/ingredients/1')
            .expect(200).end(function(err, res) {
                assert(Array.isArray(res.body));
                done();
            });
        
    });

    it('should get all ingredients', async function() {
            request(app)
            .get('/ingredients')
            .expect(200).end(function(err, res) {
                if (err) return done(err);
                assert(Array.isArray(response.body));
                done();
            });
    });

    it('should create a new ingredient', async function() {
        const newIngredient = {
            Name: 'Test Ingredient',
            Category: 'Test Category',
            Description: 'Test Description',
            Image: 'Test Image'
        };

        request(app)
            .post('/ingredients')
            .send(newIngredient)
            .expect(201).end(function(err, res) {
                if (err) return done(err);
                assert(response.body.ID);
                done();
        });
    });

    it('should update an ingredient', async function() {
        const updatedIngredient = {
            Name: 'Updated Ingredient',
            Category: 'Updated Category',
            Description: 'Updated Description',
            Image: 'Updated Image'
        };

        request(app)
            .put('/ingredients/1')
            .send(updatedIngredient)
            .expect(200).end(function(err, res) {
                if (err) return done(err);
                assert(response.body.ID);
                done();
        });
    });

    it('should delete an ingredient', async function() {
        request(app)
            .delete('/ingredients/1')
            .expect(204).end(function(err, res) {
                if (err) return done(err);
                done();
        });
    });
});