const assert = require('assert');
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cocktailsRouter = require('../routes/cocktails');

const app = express();

app.use(bodyParser.json());
app.use('/cocktails', cocktailsRouter);

describe('Cocktails API', function() {
    it('should get a cocktail by id', async function() {
            request(app)
            .get('/cocktails/1')
            .expect(200).end(function(err, res) {
                assert(Array.isArray(res.body));
                done();
            });
        
    });

    it('should get all cocktails', async function() {
            request(app)
            .get('/cocktails')
            .expect(200).end(function(err, res) {
                if (err) return done(err);
                assert(Array.isArray(response.body));
                done();
            });
    });

    it('should create a new cocktail', async function() {
        const newCocktail = {
            Name: 'Test Cocktail',
            Recipe: 'Test Recipe',
            Category: 'Test Category',
            Ingredients: [
                { ID: 1, Quantity: '1 oz' },
                { ID: 2, Quantity: '2 oz' }
            ]
        };

        request(app)
            .post('/cocktails')
            .send(newCocktail)
            .expect(201).end(function(err, res) {
                if (err) return done(err);
                assert(response.body.ID);
                done();
        });
    });

    it('should update a cocktail', async function() {
        const updatedCocktail = {
            Name: 'Updated Cocktail',
            Recipe: 'Updated Recipe',
            Category: 'Updated Category',
            Ingredients: [
                { ID: 1, Quantity: '1 oz' },
                { ID: 2, Quantity: '2 oz' }
            ]
        };

            request(app)
            .put('/cocktails/1')
            .send(updatedCocktail)
            .expect(204).end(function(err, res) {
                if (err) return done(err);
                done();
    });

    it('should delete a cocktail', async function() {
            request(app)
            .delete('/cocktails/1')
            .expect(204).end(() => done());
    });
})
});