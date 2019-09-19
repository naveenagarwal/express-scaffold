module.exports = (name, servicesPath, modelsPath, getObjectName) => `const { ${name}, Sequelize } = require(process.cwd() + '${modelsPath}');
const ModelBaseService = require(process.cwd() + '${servicesPath}/base-service');

class ${name}Service extends ModelBaseService {

    constructor() {
        super();
    }

    async findAll(params) {
        const queryParams = this.buildQuery(params);
        return ${name}.findAll(params);
    }

    async find(id) {
        return ${name}.findOne({
            where: { id: id}
        });
    }

    async create(params) {
        return ${name}.create(params)
            .then(([user, created]) => {
                return user.get({ plain: true });
            });
    }

    async update(id, params) {
        const ${getObjectName(name)} = await ${name}.findOne({
            where: { id: id}
        });

        return ${getObjectName(name)}.update(params);
    }

    async destroy(id) {
        const ${getObjectName(name)} = await ${name}.findOne({
            where: { id: id}
        });

        return ${getObjectName(name)}.destroy();
    }
}

module.exports = ${name}Service;`;