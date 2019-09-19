module.exports = (name, servicesPath, getFileName, getObjectName) => `const express = require('express');
const router = express.Router();

const ${name}Service = require(process.cwd() + '${servicesPath}/${getFileName(name, "-service")}');

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
    try {
        const ${getObjectName(name)}Service = new ${name}Service();
        const ${getObjectName(name)} = await ${getObjectName(name)}Service.find(req.params.id);
        res.json({ data: ${getObjectName(name)} });
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const ${getObjectName(name)}Service = new ${name}Service();
        const ${getObjectName(name)} = await ${getObjectName(name)}Service.create(req.body.${name});
        res.json({ data: ${getObjectName(name)} });
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const ${getObjectName(name)}Service = new ${name}Service();
        const ${getObjectName(name)} = await ${getObjectName(name)}Service.update(req.params.id, req.body.${name});
        res.json({ data: ${getObjectName(name)} });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const ${getObjectName(name)}Service = new ${name}Service();
        const ${getObjectName(name)} = await ${name}Service.destroy(req.params.id);
        res.json({ data: ${getObjectName(name)} });
    } catch (error) {
        next(error);
    }
});

module.exports = router;`;