const utilFunctions = {
    getDefaultConfig:  function() {
        return {
            "models-path": cwd + '/models',
            "controllers-path": cwd + '/app/controllers',
            "services-path": cwd + '/lib/services'
        }
    },

    getFileName: function(name, suffix) {
        return name.replace(/\.?([A-Z]+)/g, function (x,y){ return "-" + y.toLowerCase() }).replace(/^-/, "") +
            suffix;
    },

    getObjectName: function(name) {
        return name.replace(/\.?([A-Z]+)/, function (x,y){ return "-" + y.toLowerCase() }).replace(/^-/, "")
    }
};

module.exports = utilFunctions;