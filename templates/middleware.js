module.exports = (name, conditionsFileds, attributesFields) => `const ALLOWED_PARAMS = {
    "getAll": {
        "conditions" : ${JSON.stringify(conditionsFileds)},
        "pageInfo" : ["pageNum", "limit"]
    },

    "create" : {
        "${name}" : ${JSON.stringify(attributesFields)}
    },

    "update" : {
        "${name}" : ${JSON.stringify(attributesFields)}
    }
};

middlewares = {
    permit: function(req, params, key) {
        Object.keys(params).forEach((param) => {
            console.log(param);
            if(key == 'query') {
                if(req.query[param])
                    req.query[param] = req.parameters.require(param).permit(...params[param]).value();
            } else if( key == 'body') {
                if(req.body[param])
                    req.body[param] = req.parameters.require(param).permit(...params[param]).value();
            }

        });
    },

    onGetAll: function(req, res, next) {
        middlewares.permit(req, ALLOWED_PARAMS["getAll"], 'query');
        next();
    },

    onCreate: function(req, res, next) {
        middlewares.permit(req, ALLOWED_PARAMS["create"], 'body');
        next();
    },

    onUpdate: function(req, res, next) {
        middlewares.permit(req, ALLOWED_PARAMS["update"], 'body');
        next();
    }
}

module.exports = middlewares;`;