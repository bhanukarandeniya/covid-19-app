const { param, query, validationResult } = require('express-validator');


const paginationValidator = [query('page').isNumeric(), query('size').isNumeric()];

const paramIdValidator = [param('id').isNumeric()];

const validate = (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
}

module.exports = { paginationValidator, paramIdValidator, validate };