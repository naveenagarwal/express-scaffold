module.exports = (name, conditionsFileds, attributesFields) => `const BaseMiddleware = require('./base-middleware');

const ALLOWED_PARAMS = {
    "getAll": {
        "conditions": ${JSON.stringify([...conditionsFileds, ...["cretaedAt", "updatedAt"]])},
        "pageInfo": ["pageNum", "limit"],
        "include": [],
        "attributes": [],
        "order": ["key", "type"]
    },

    "create" : {
        "${name}": ${JSON.stringify(attributesFields)}
    },

    "update" : {
        "${name}": ${JSON.stringify(attributesFields)}
    }
};

class ${name}Middleware extends BaseMiddleware {
    static onGetAll(req, res, next) {
        ${name}Middleware.permit(req, ALLOWED_PARAMS["getAll"], 'query');
        next();
    }

    static onCreate(req, res, next) {
        ${name}Middleware.permit(req, ALLOWED_PARAMS["create"], 'body');
        next();
    }

    static onUpdate(req, res, next) {
        ${name}Middleware.permit(req, ALLOWED_PARAMS["update"], 'body');
        next();
    }
}

module.exports = ${name}Middleware;`;