
exports.petsValidator = (req, res, next) => 
{
    req.check('name', 'Name field is required').notEmpty();
    req.check('age', 'Age field is required').notEmpty();
    req.check('age', 'Age must be a number').isInt();
    req.check('color', 'Color field is requied').notEmpty();

    const errors = req.validationErrors();

    if(errors)
    {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError })
    }

    next();
}           