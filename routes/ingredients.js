
/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: API for managing ingredients
 */








const express = require('express');
const router = express.Router();
const db = require('../helpers/database');

/**
 * @swagger
 * /ingredients/{id}:
 *   get:
 *     summary: Retrieve a single ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ingredient ID
 *     responses:
 *       200:
 *         description: The ingredient data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 IngredientID:
 *                   type: integer
 *                 Name:
 *                   type: string
 *                 Type:
 *                   type: string
 *                 IsAlcoholic:
 *                   type: boolean
 *                 Image:
 *                   type: string
 *                 Description:
 *                   type: string
 *       400:
 *         description: Bad request
 */

router.get('/:id', async (req, res) => {
    try {
        const sqlQuery = 'SELECT * FROM ingredients WHERE IngredientID = ?';
        const rows = await db.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});



/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Retrieve a list of ingredients
 *     tags: [Ingredients]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by ingredient name
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by ingredient type
 *       - in: query
 *         name: isAlcoholic
 *         schema:
 *           type: boolean
 *         description: Filter by alcoholic content
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by a specific field
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (asc or desc)
 *     responses:
 *       200:
 *         description: A list of ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IngredientID:
 *                     type: integer
 *                   Name:
 *                     type: string
 *                   Type:
 *                     type: string
 *                   IsAlcoholic:
 *                     type: boolean
 *                   Image:
 *                     type: string
 *                   Description:
 *                     type: string
 *       400:
 *         description: Bad request
 */

router.get('/', async (req, res) => {
    try {
        let sqlQuery = 'SELECT * FROM ingredients';
        const params = [];
        if (req.query.name) {
            if(params.length === 0) {
                sqlQuery += ' WHERE Name LIKE ?';
            }
            else {
                sqlQuery += ' AND Name LIKE ?';
            }
            params.push(`%${req.query.name}%`);
        }
        if (req.query.type) {
            if(params.length === 0) {
                sqlQuery += ' WHERE Type = ?';
            }
            else {
                sqlQuery += ' AND Type = ?';
            }
            params.push(req.query.type);
        }
        if (req.query.isAlcoholic) {
            if(params.length === 0) {
                sqlQuery += ' WHERE IsAlcoholic = ?';
            }
            else {
                sqlQuery += ' AND IsAlcoholic = ?';
            }
            params.push(req.query.isAlcoholic);
        }
        const rows = await db.query(sqlQuery, params);
        res.status(200).json(rows);
        if(req.query.sortBy) {
            const sortOrder = req.query.sortOrder === 'desc' ? 'DESC' : 'ASC';
            sqlQuery += ` ORDER BY ${req.query.sortBy} ${sortOrder}`;
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * @swagger
 * /ingredients:
 *   post:
 *     summary: Create a new ingredient
 *     tags: [Ingredients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Type:
 *                 type: string
 *               IsAlcoholic:
 *                 type: boolean
 *               Image:
 *                 type: string
 *               Description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ingredient created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ID:
 *                   type: integer
 *       400:
 *         description: Bad request
 */

router.post('/', async (req, res) => {
    try {
        
        const sqlQuery = 'INSERT INTO ingredients (Name, Type, IsAlcoholic, Image, Description) VALUES (?, ?, ?, ?, ?)';
        const result = await db.query(sqlQuery, [req.body.Name, req.body.Type, req.body.IsAlcoholic, req.body.Image, req.body.Description]);
        res.status(201).json({"ID": Number(result.insertId)});
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});



/**
 * @swagger
 * /ingredients/{id}:
 *   put:
 *     summary: Update an existing ingredient
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ingredient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Type:
 *                 type: string
 *               IsAlcoholic:
 *                 type: boolean
 *               Image:
 *                 type: string
 *               Description:
 *                 type: string
 *     responses:
 *       204:
 *         description: Ingredient updated successfully
 *       400:
 *         description: Bad request
 */


router.put('/:id', async (req, res) => {
    try {
        let sqlQuery = 'UPDATE ingredients SET ';
        updates = [];
        if(req.body.Name) {
            if(updates.length > 0) {
                sqlQuery += ', ';
            }
            updates.push(req.body.Name);
            sqlQuery += 'Name = ?';
        }
        if(req.body.Type) {
            if(updates.length > 0) {
                sqlQuery += ', ';
            }
            updates.push(req.body.Type);
            sqlQuery += 'Type = ?';
        }
        if(req.body.IsAlcoholic) {
            if(updates.length > 0) {
                sqlQuery += ', ';
            }
            updates.push(req.body.IsAlcoholic);
            sqlQuery += 'IsAlcoholic = ?';
        }
        if(req.body.Image) {
            if(updates.length > 0) {
                sqlQuery += ', ';
            }
            updates.push(req.body.Image);
            sqlQuery += 'Image = ?';
        }
        if(req.body.Description) {
            if(updates.length > 0) {
                sqlQuery += ', ';
            }
            updates.push(req.body.Description);
            sqlQuery += 'Description = ?';
        }
        sqlQuery += ' WHERE IngredientID = ?';
        updates.push(req.params.id);
        await db.query(sqlQuery, updates);
        res.status(204).send();

    }
    catch (error) {
        res.status(400).send(error.message);
    }
});

/**
 * @swagger
 * /ingredients/{id}:
 *   delete:
 *     summary: Delete an ingredient
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ingredient ID
 *     responses:
 *       204:
 *         description: Ingredient deleted successfully
 *       400:
 *         description: Bad request
 */
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM ingredients WHERE IngredientID = ?', req.params.id);
        await db.query('DELETE FROM cocktail_ingredients WHERE IngredientID = ?', req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
module.exports = router;