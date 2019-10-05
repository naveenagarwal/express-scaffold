const utilFunctions = {
    getDefaultConfig:  function() {
        return {
            "models-path": cwd + '/models',
            "controllers-path": cwd + '/app/controllers',
            "services-path": cwd + '/lib/services',
            "middlewares-path": cwd + '/lib/middlewares'
        }
    },

    getFileName: function(name, suffix) {
        return name.replace(/\.?([A-Z]+)/g, function (x,y){ return "-" + y.toLowerCase() }).replace(/^-/, "") +
            suffix;
    },

    getObjectName: function(name) {
        return name.replace(/\.?([A-Z]+)/, function (x,y){ return "-" + y.toLowerCase() }).replace(/^-/, "")
    },

    getAttributes: function(attributes){
        attributes = [...attributes, 'createdAt:datetime', 'updatedAt:datetime'].map((attribute) => {
            const [name, type] = attribute.split(':')
            const formattedAttribute = {
                'name' : name,
                'type' :(utilFunctions.attributeType[type].type || 'string')
            }

            if(utilFunctions.attributeType[type].format)
                formattedAttribute.format = utilFunctions.attributeType[type].format;

            return formattedAttribute;
        });

        return attributes;
    },

    attributeType: {
        'string' : { type: 'string' },
        'text' : { type: 'string' },
        'enum' : { type: 'string' },
        'uuid' : { type: 'string', fomrat: 'uuid' },
        'date' : { type: 'string', format: 'date' },
        'datetime' : { type: 'string', format: 'date-time' },
        'float': { type: 'number', format: 'float' },
        'double': { type: 'number', format: 'double' },
        'integer': { type: 'integer' },
        'boolean': { type: 'boolean' },
    }
};

module.exports = utilFunctions;