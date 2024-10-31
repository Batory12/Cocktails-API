const express = require('express');
const router = express.Router();
const db = require('../helpers/database');

/**
 * @swagger
 * components:
 *   schemas:
 *     Cocktail:
 *       type: object
 *       required:
 *         - Name
 *         - Recipe
 *         - Category
 *       properties:
 *         CocktailID:
 *           type: integer
 *           description: The auto-generated ID of the cocktail
 *         Name:
 *           type: string
 *           description: The name of the cocktail
 *         Recipe:
 *           type: string
 *           description: The recipe of the cocktail
 *         Category:
 *           type: string
 *           description: The category of the cocktail
 *       example:
 *         CocktailID: 1
 *         Name: Margarita
 *         Recipe: Mix ingredients and serve over ice
 *         Category: Classic
 */

/**
 * @swagger
 * tags:
 *   name: Cocktails
 *   description: The cocktails managing API
 */

/**
 * @swagger
 * /cocktails:
 *   get:
 *     summary: Returns the list of all the cocktails
 *     tags: [Cocktails]
 *     responses:
 *       200:
 *         description: The list of the cocktails
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cocktail'
 */
router.get('/', async (req, res) => {
    try {
        let sqlQuery = 'SELECT * FROM cocktails';
        const params = [];
        
        // Filtering
        if (req.query.name) {
            sqlQuery += ' WHERE Name LIKE ?';
            params.push(`%${req.query.name}%`);
        }

        // Sorting
        if (req.query.sortBy) {
            const sortBy = req.query.sortBy === 'name' ? 'Name' : 'CocktailID';
            const sortOrder = req.query.sortOrder === 'desc' ? 'DESC' : 'ASC';
            sqlQuery += ` ORDER BY ${sortBy} ${sortOrder}`;
        }

        const rows = await db.query(sqlQuery, params);
        res.status(200).json(rows);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * @swagger
 * /cocktails/{id}:
 *   get:
 *     summary: Get a cocktail by ID
 *     tags: [Cocktails]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The cocktail ID
 *     responses:
 *       200:
 *         description: The cocktail description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cocktail'
 *       400:
 *         description: Invalid ID supplied
 */
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

/**
 * @swagger
 * /cocktails:
 *   post:
 *     summary: Create a new cocktail
 *     tags: [Cocktails]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cocktail'
 *     responses:
 *       201:
 *         description: The cocktail was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cocktail'
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
    try {
        const sqlQuery = 'INSERT INTO cocktails (Name, Recipe, Category) VALUES (?, ?, ?)';
        const result = await db.query(sqlQuery, [req.body.Name, req.body.Recipe, req.body.Category]);
        if(req.body.Ingredients) {
            const cocktailID = Number(result.insertId);
            const sqlQuery = 'INSERT INTO cocktail_ingredients (CocktailID, IngredientID, Quantity) VALUES ';
            const values = req.body.Ingredients.map(ingredient => `(${cocktailID}, ${ingredient.ID}, "${ingredient.Quantity}")`);
            await db.query(sqlQuery + values.join(', '));
        }
        res.status(201).json({"ID": Number(result.insertId)});
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;