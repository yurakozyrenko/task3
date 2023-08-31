const express = require('express');
const router = express.Router();
const UsersControllers = require('../controllers/users.controller');

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - age
 *          - isMan
 *        properties:
 *          id:
 *            type: integer
 *            description: generate user by id
 *          name:
 *            type: string
 *            description: user name
 *          age:
 *            type: integer
 *            description: user age
 *          isMan:
 *            type: boolean
 *            description: Gender user
 *        example:
 *            id: 1
 *            name: Yura
 *            age: 34
 *            isMan: true
 */

/**
 * @swagger
 *  components:
 *    operas:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - age
 *          - isMan
 *        properties:
 *          id:
 *            type: integer
 *            description: generate user by id
 *          name:
 *            type: string
 *            description: user name
 *          age:
 *            type: integer
 *            description: user age
 *          isMan:
 *            type: boolean
 *            description: Gender user
 *        example:
 *            name: Yura
 *            age: 34
 *            isMan: true
 */

/**
 * @swagger
 *  components:
 *    ops:
 *      User:
 *        type: object
 *        required:
 *          - name
 *          - age
 *          - isMan
 *        properties:
 *          id:
 *            type: integer
 *            description: generate user by id
 *          name:
 *            type: string
 *            description: user name
 *          age:
 *            type: integer
 *            description: user age
 *          isMan:
 *            type: boolean
 *            description: Gender user
 *        example:
 *            name: Yura
 */

/**
 * tags:
 *  name: Users
 *  descriptions: The users managing API
 */

/**
 * @swagger
 * /api:
 *  get:
 *    summary: Get all users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: Success, list all users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/User"
 *      500:
 *        description: Some server err
 */

router.get('/', async (req, res) => {
    try {
        const users = await UsersControllers.getUsers();
        res.send(users);
    } catch (error) {
        return res.status(500).send(error);
    }
});

/**
 * @swagger
 * /api/create:
 *  post:
 *      summary: Create a new user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          description: Create a new user
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/operas/User'
 *      responses:
 *          200:
 *              description: The user was successfully created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Some server err
 */

router.post('/create', async (req, res) => {
    try {
        const newUser = await UsersControllers.postUser(req.body);
        res.send(newUser);
    } catch (error) {
        return res.send(error);
    }
});

/**
 * @swagger
 * /api/edit/{id}:
 *  put:
 *      summary: Edit user by id
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              minimum: 1
 *            required: true
 *            description: user id
 *      requestBody:
 *          required: true
 *          description: Edit user by id or create a new user
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/operas/User'
 *      responses:
 *          200:
 *              description: Successfully edited user by id
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          404:
 *              description: The user was not found
 *          500:
 *              description: Some error
 */

router.put('/edit/:id', async (req, res) => {
    try {
        const user = await UsersControllers.putUserById(
            req.body,
            req.params.id
        );
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * @swagger
 * /api/editUser/{id}:
 *  patch:
 *      summary: Update user by id
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *              minimum: 1
 *            required: true
 *            description: user id
 *      requestBody:
 *          required: true
 *          description: Edit user by id or create a new user
 *          content:
 *              application/json:
 *                  schema:
 *                     $ref: '#/components/ops/User'
 *      responses:
 *          200:
 *            description: Successfully updated user by id
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/User'
 */

router.patch('/editUser/:id', async (req, res) => {
    try {
        const user = await UsersControllers.patchUserById(
            req.body,
            req.params.id
        );
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * @swagger
 * /api/delete/{id}:
 *  delete:
 *      summary: Delete user by id
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: The user id
 *      responses:
 *          200:
 *              description: Successfully deleted user by id
 *          404:
 *              description: The user was not found
 */

router.delete('/delete/:id', async (req, res) => {
    try {
        const user = await UsersControllers.deleteUserById(req.params.id);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

/**
 * @swagger
 * /api/userById/{id}:
 *  get:
 *    summary: Get the user by id
 *    tags: [User]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The user id
 *    responses:
 *      200:
 *        description: The user description by id
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/User"
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some server err
 */

router.get('/userById/:id', async (req, res) => {
    try {
        const user = await UsersControllers.getUsersById(req.params.id);
        if (!user) {
            res.sendStatus(404);
        }
        res.send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
});

/**
 * @swagger
 * /api/{gender}:
 *  get:
 *      summary: Get users by gender
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: gender
 *            schema:
 *              type: string
 *            required: true
 *            description: users gender (F||M)
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/User"
 *          404:
 *              description: The users by gender was not found
 *          500:
 *              description: Some server err
 */

router.get('/:gender', async (req, res) => {
    try {
        const user = await UsersControllers.getUsersByGender(req.params.gender);
        if (!user) {
            res.sendStatus(404);
        }
        res.send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
});

/**
 * @swagger
 * /api/a/filtredUsers:
 *  get:
 *      summary: Get users by age
 *      tags: [User]
 *      parameters:
 *          - in: query
 *            name: min
 *            schema:
 *              type: integer
 *            required: true
 *          - in: query
 *            name: max
 *            schema:
 *              type: integer
 *            required: true
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                application/json:
 *                  schema:
 *                    type: array
 *                    items:
 *                      $ref: "#/components/schemas/User"
 *          404:
 *              description: The users by age was not found
 *          500:
 *              description: Some server err
 */

router.get('/a/filtredUsers', async (req, res) => {
    try {
        const user = await UsersControllers.getUsersByAge(req.query);
        res.send(user);
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = router;
