module.exports = (modelsPath) => `const { Sequelize } = require(process.cwd() + '${modelsPath}');
const Op = Sequelize.Op;

class ModelBaseService {

    buildQuery(params = {}) {
        const queryObject = Object.assign(this.defaultPagination(), params.pageInfo);
        if(params.attributes) queryObject.attributes = Object.assign({}, params.attributes);
        if(params.conditions) queryObject.where = this.buildWhereCondition(Object.assign({}, params.conditions));
        return queryObject;
    }

    buildWhereCondition(conditions) {
        for(let key in conditions)
            if(conditions[key] instanceof Array)
                conditions[key] = { [Op.in] : conditions[key] }

        return conditions;
    }

    defaultPagination() {
        return {
            offset: 0,
            limit: 10
        }
    }
}

module.exports = ModelBaseService;`