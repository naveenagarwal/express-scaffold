module.exports = (name, conditionsFileds, attributesFields) => `const ALLOWED_PARAMS = {
    "getAll": {
        "conditions" : ${JSON.stringify(conditionsFileds)},
        "pageInfo" : ["pageNum", "limit"],
        "include": [],
        "order": ["key", "type"]
    },

    "create" : {
        "${name}" : ${JSON.stringify(attributesFields)}
    },

    "update" : {
        "${name}" : ${JSON.stringify(attributesFields)}
    }
};

${name}middlewares = {
    permit: function(req, params, key) {
        Object.keys(params).forEach((param) => {
            if(key == 'query') {
                if(req.query[param]) {
                    if(req.query[param] instanceof Array)
                        req.query[param] = req.parameters.require(param).all();
                    else
                        req.query[param] = req.parameters.require(param).permit(...params[param]).value();
                }
            } else if( key == 'body') {
                if(req.body[param])
                    req.body[param] = req.parameters.require(param).permit(...params[param]).value();
            }

        });

        if(req.query.include_condition)
            req.query['include_condition'] = req.parameters.require('include_condition').all();
    },

    onGetAll: function(req, res, next) {
        ${name}middlewares.permit(req, ALLOWED_PARAMS["getAll"], 'query');
        next();
    },

    onCreate: function(req, res, next) {
        ${name}middlewares.permit(req, ALLOWED_PARAMS["create"], 'body');
        next();
    },

    onUpdate: function(req, res, next) {
        ${name}middlewares.permit(req, ALLOWED_PARAMS["update"], 'body');
        next();
    }
}

module.exports = ${name}middlewares;`;