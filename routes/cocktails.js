const express = require('express');
const router = express.Router();
const db = require('../helpers/database');

router.get('/:id', async (req, res) => {
    try {
        const sqlQuery = 'SELECT * FROM cocktails WHERE CocktailID = ?';
        const rows = await db.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
router.get('/', async (req, res) => {
    try {
        let sqlQuery = 'SELECT * FROM cocktails';
        const params = [];
        

        //Get by id
        if (req.query.id) {
            sqlQuery += ' WHERE CocktailID = ?';
            params.push(req.query.id);
        }
        else {
            // Filtering
            if (req.query.name) {
                sqlQuery += ' WHERE Name LIKE ?';
                params.push(`%${req.query.name}%`);
            }
            console.log(req.query);

            // Sorting
            if (req.query.sortBy) {
                const sortOrder = req.query.sortOrder === 'desc' ? 'DESC' : 'ASC';
                sqlQuery += ` ORDER BY ${req.query.sortBy} ${sortOrder}`;
            }
        }

        const rows = await db.query(sqlQuery, params);
        console.log(sqlQuery);
        res.status(200).json(rows);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
router.post('/', async (req, res) => {
    try {
        const sqlQuery = 'INSERT INTO cocktails (Name, Recipe) VALUES (?, ?, ?)';
        const result = await db.query(sqlQuery, [req.body.Name, req.body.Recipe, req.body.Category]);
        if(req.body.Ingredients) {
            const cocktailID = Number(result.insertId);
            const sqlQuery = 'INSERT INTO cocktail_ingredients (CocktailID, IngredientID, Quantity) VALUES ';
            const values = req.body.Ingredients.map(ingredient => `(${cocktailID}, ${ingredient.ID}, "${ingredient.Quantity}")`);
            await db.query(sqlQuery+values.join(', '));
        }
        res.status(201).json({"ID": Number(result.insertId)});
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
router.put('/:id', async (req, res) => {
    try {
        const sqlQuery = 'UPDATE cocktails SET Name = ?, Recipe = ?, Category_ID = ? WHERE CocktailID = ?';
        await db.query(sqlQuery, [req.body.Name, req.body.Recipe, req.params.id, req.body.Category]);

        if(req.body.Ingredients) {
            const cocktailID = req.params.id;
            // Delete existing ingredients
            const deleteQuery = 'DELETE FROM cocktail_ingredients WHERE CocktailID = ?';
            await db.query(deleteQuery, [cocktailID]);

            // Insert new ingredients
            const insertQuery = 'INSERT INTO cocktail_ingredients (CocktailID, IngredientID, Quantity) VALUES ';
            const values = req.body.Ingredients.map(ingredient => `(${cocktailID}, ${ingredient.ID}, "${ingredient.Quantity}")`);
            await db.query(insertQuery + values.join(', '));
        }
        res.status(204).send();
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM cocktails WHERE CocktailID = ?', req.params.id);
        await db.query('DELETE FROM cocktails WHERE CocktailID = ?', req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
module.exports = router;