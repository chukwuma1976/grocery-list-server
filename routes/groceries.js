import express from 'express';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const file = "./allGroceries.json"

// Mock database
let groceries = [];
fs.readFile(file, (error, data) => {
    if (error) {
        console.log('Could not read file');
        throw error;
    }
    groceries = JSON.parse(data) || [];
});

function writeJSON(groceries) {
    const data = JSON.stringify(groceries, null, 2);
    fs.writeFile(file, data, error => {
        if (error) {
            console.log('Could not write file');
            throw error;
        } else console.log('File written successfully');
    })
}

// Getting the list of groceries from the mock database
router.get('/', (req, res) => {
    res.send(groceries);
})

// Getting a grocery from the mock database
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const grocery = groceries.find(grocery => grocery.id === id);
    if (grocery)
        res.send(grocery);
    else res.send('grocery not found');
})

// Adding a new grocery to our mock database
router.post('/', (req, res) => {
    const grocery = req.body;
    const updatedGrocery = { ...grocery, id: uuidv4() }
    groceries.push(updatedGrocery);
    res.send(updatedGrocery);
    writeJSON(groceries);
})

// Changing an existing grocery in our mock database
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updatedgrocery = req.body;
    groceries = groceries.map(grocery => grocery.id === id ? updatedgrocery : grocery);
    res.send(updatedgrocery);
    writeJSON(groceries);
})

// Deleting a grocery from our mock database
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    groceries = groceries.filter(grocery => grocery.id !== id)
    res.send(`Item with id of ${id} deleted successfully`);
    writeJSON(groceries);
})

export default router