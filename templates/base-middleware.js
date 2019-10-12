module.exports = () => `class BaseMiddleware {
    static permit(req, params, key) {
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
    }
}

module.exports = BaseMiddleware;`;