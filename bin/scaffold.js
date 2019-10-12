#! /usr/bin/env node

console.log("Running the script to generate the scaffold for the entity.");

const fs = require("fs");
const shell = require('shelljs');
const commandLineArgs = require('command-line-args');

const { getDefaultConfig, getFileName, getObjectName, getAttributes } = require('../utils');
const { controllersTemplate,
        servicesTemplates,
        baseServiceTemplate,
        middlewareTemplate,
        baseMiddlewareTemplate } = require('../templates');

const cwd = process.cwd();
const sequelizercPath = cwd + '/.sequelizerc';
const config = fs.existsSync(sequelizercPath) ? require(sequelizercPath) : getDefaultConfig();

// read command line options
const optionDefinitions = [
    { name: 'name', alias: 'n', type: String },
    { name: 'attributes', alias: 'a', type: String, multiple: true },
    { name: 'force', type: Boolean, defaultValue: false }
  ];
const options = commandLineArgs(optionDefinitions);

// run sequelize cli model generaiton command
const sequelizeCommand = `npx sequelize-cli model:generate ${options.force ? '--force' : '' } --name ${options.name} --attributes ${options.attributes.join(',')}`

console.log(`executing:\n${sequelizeCommand}`);
shell.exec(sequelizeCommand);
console.log('sequelize default commands executed');

// creating controllers, middlwares, and services
console.log('------------ Createing controllers, middlwares, and services-------------');

// create if controller or services directories don't exists
shell.exec(`mkdir -p ${config['services-path'] }`);
shell.exec(`mkdir -p ${config['controllers-path'] }`);
shell.exec(`mkdir -p ${config['middlewares-path'] }`);

// paths variables
const servicesPath = config['services-path'].replace(cwd, '');
const modelsPath = config['models-path'].replace(cwd, '');
const middlewaresPath =  config['middlewares-path'].replace(cwd, '');

// create base service
const baseServiceFilePath = config['services-path'] + '/base-service.js';
if (!fs.existsSync(baseServiceFilePath)) {
    fs.writeFileSync(baseServiceFilePath, baseServiceTemplate(modelsPath));
    console.log('Created base service : ' + baseServiceFilePath);
}

// create name service
const serviceFilename = getFileName(options.name, "-service.js");
const serviceFilePath = config['services-path'] + `/${serviceFilename}`;
if (!fs.existsSync(serviceFilePath) || options.force) {
    fs.writeFileSync(serviceFilePath, servicesTemplates(options.name, servicesPath ,modelsPath, getObjectName));
    console.log('Created model service: ' + serviceFilePath);
}

// create strong-params middlewares for the controller actions
const baseMiddlewarePath = config['middlewares-path'] + '/base-middleware.js';
if (!fs.existsSync(baseMiddlewarePath) || options.force) {
    fs.writeFileSync(baseMiddlewarePath, baseMiddlewareTemplate());
    console.log('Base middleware Created: ' + baseMiddlewarePath);
}

const middlewareFileName = getFileName(options.name, "-middleware.js");
const middlewareFilePath = config['middlewares-path'] + `/${middlewareFileName}`;
const attributesFields = options.attributes.join(',').split(',').map((attribute) => attribute.replace(/\:.*/g, ''));
const conditionsFileds = ['id', ...attributesFields];
if (!fs.existsSync(middlewareFilePath) || options.force) {
    fs.writeFileSync(middlewareFilePath, middlewareTemplate(options.name, conditionsFileds, attributesFields));
    console.log('Created middleware: ' + middlewareFilePath);
}

// create name controller
const controllerFilename = getFileName(options.name, "-controller.js");
const controllerFilePath = config['controllers-path'] + `/${controllerFilename}`;
if (!fs.existsSync(controllerFilePath) || options.force) {
    fs.writeFileSync(controllerFilePath, controllersTemplate(options.name, servicesPath, middlewaresPath, getFileName, getObjectName));
    console.log('Created controller: ' + controllerFilePath);
}


// generate the api-specs
const Swagger = require('@amiadeveloper/express-swagger-specs-generator');
const attributes =  getAttributes(options.attributes.join(',').split(','))// JSON.parse(fs.readFileSync(options.filepath));
const path = cwd + '/api-specs';

// create the swagger specs from the file
const swagger = new Swagger(options.name, attributes, path);
swagger.init();
swagger.generateSpecFile(options.force);
swagger.generateSwaggerJSONFile();

// its all done, exit the process
process.exit(0);