module.exports = (name, servicesPath, middlewaresPath, getFileName, getObjectName) => `const express = require('express');
const router = express.Router();

const ${name}Service = require(process.cwd() + '${servicesPath}/${getFileName(name, "-service")}');
const ${name}Middleware = require(process.cwd() + '${middlewaresPath}/${getFileName(name, "-middleware")}');

router.get('/', ${name}Middleware.onGetAll, async (req, res, next) => {
    try {
        const ${getObjectName(name)}Service = new ${name}Service();
        const ${getObjectName(name)}s = await ${getObjectName(name)}Service.findAll(req.query);

        const response = {
            data : ${getObjectName(name)}s,
            pageInfo: {
                pageSize: ${getObjectName(name)}Service.pageSize,
                pageLimit: ${getObjectName(name)}Service.pageLimit
            }
        };
        res.json(response);
    } catch (error) {
        next(error);
    }

});

router.get('/:id', async (req, res, next) => {
    try {
        const ${getObjectName(name)}Service = new ${name}Service();
        const ${getObjectName(name)} = await ${getObjectName(name)}Service.find(req.params.id);
        res.json({ data: ${getObjectName(name)} });
    } catch (error) {
        next(error);
    }
});

router.post('/', ${name}Middleware.onCreate, async (req, res, next) => {
    try {
        const ${getObjectName(name)}Service = new ${name}Service();
        const ${getObjectName(name)} = await ${getObjectName(name)}Service.create(req.body.${name});
        res.json({ data: ${getObjectName(name)} });
    } catch (error) {
        next(error);
    }
});

router.put('/:id', ${name}Middleware.onUpdate, async (req, res, next) => {
    try {
        const ${getObjectName(name)}Service = new ${name}Service();
        const ${getObjectName(name)} = await ${getObjectName(name)}Service.update(req.params.id, req.body.${name});
        res.json({ data: ${getObjectName(name)} });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const ${getObjectName(name)}Service = new ${name}Service();
        const ${getObjectName(name)} = await ${getObjectName(name)}Service.destroy(req.params.id);
        res.json({ data: ${getObjectName(name)} });
    } catch (error) {
        next(error);
    }
});

module.exports = router;`;