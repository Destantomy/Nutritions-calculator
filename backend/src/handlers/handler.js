const foodsModel = require('../model/model');

const calculate = (req, res) => {
    try {
        const { food, amount, unit } = req.body;

        if(!foodsModel[food]) {
            return res.status(404).json({ error: 'Food not found' });
        }

        if(amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount! It must be greater than 0' });
        }

        let weight;
        if(unit === 'mg') {
            weight = amount/1000;
        } else if(unit === 'gram') {
            weight = amount;
        } else {
            return res.status(400).json({ error: 'Invalid unit! It must be either mg or gram' });
        }

        const { calories, protein, carbohydrates, fats } = foodsModel[food];
        const formula = weight / 100;

        const result = {
            calories: calories * formula.toFixed(2),
            protein: protein * formula.toFixed(2),
            carbohydrates: carbohydrates * formula.toFixed(2),
            fats: fats * formula.toFixed(2),
        }
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = calculate;