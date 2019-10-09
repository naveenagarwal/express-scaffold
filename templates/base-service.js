module.exports = (modelsPath) => `const db = require(process.cwd() + '/src/app/models');
const Op = db.Sequelize.Op;

class ModelBaseService {

    buildQuery(params = {}) {
        const queryObject = this.pageInfo(params.pageInfo);
        if(params.attributes) queryObject.attributes = Object.assign(params.attributes, {});
        if(params.conditions) queryObject.where = this.buildWhereCondition(Object.assign(params.conditions, {}));
        if(params.include) queryObject.include = this.buildIncludeCondition(params.include, params.include_conditions)
        if(params.order) queryObject.order = [ params.order.split(',') ]
        return queryObject;
    }

    buildIncludeCondition(models, modelConditions = {}) {
        console.log(models);
        return models.map((model) => {
            const condition = { model: db[model] }

            if(modelConditions[model])
                condition.where = this.buildWhereCondition(Object.assign(modelConditions[model].conditions, {}));

            return condition;
        });
    }

    buildWhereCondition(conditions) {
        for(let key in conditions)
            if(conditions[key] instanceof Array)
                conditions[key] = { [Op.in] : conditions[key] }

        return conditions;
    }

    pageInfo(pageInfo = {}) {
        const defaultPagination = this.defaultPagination();
        const offset = parseInt(pageInfo.limit || defaultPagination.limit) * (parseInt(pageInfo.pageNum) || 0)
        return {
            offset:  offset,
            limit: parseInt(pageInfo.limit || defaultPagination.limit)
        }
    }

    defaultPagination() {
        return {
            offset: 0,
            limit: 10
        }
    }
}

module.exports = ModelBaseService;`