# express-scaffold
This package will provide scaffold functionality similar to rails scaffold generator which can be used to create the controller, model, service, middleware, and migration.

**Note**: This is an extention to sequelize-cli package, hence will only work to support sequelize ORM for now.

### How to use?
Set the controllers, models, and services path in your *.sequelizerc* file

**Step 1.**
```
const path = require('path');

module.exports = {
  'controllers-path': path.resolve('app', 'controllers'),
  'models-path': path.resolve('app', 'models'),
  'services-path': path.resolve('lib', 'services'),
  'middlewares-path': path.resolve('lib', 'middlewares')
}
```

**Step 2.**
```
npm install --save-dev @naveen.agarwal/express-scaffold
npx sequelize-cli init
npx scaffold  --force --name User --attributes firstName:string,lastName:string
// above command syntax is same as sequelize-cli model creation syntax
npx sequelize-cli db:migrate
```

The above command will generate the following files:
```
app/models/user.js
migraitons/{TimeStamp}-create-user.js
app/controllers/user-controller.js
lib/services/base-service.js // if not already exists
lib/services/user-service.js
lib/middlewares/user-middleware.js
```

**Step 3.**

Mount it in your main routing file o index.js/app.js
```
const express = require('express')
const app = express()
const user = require('./app/controllers/user-controller');
app.use('/users', user);
```

**Update**
Strong params has been added. In order to make it work please ensure you have strong params added in your application. If not then you can add it by running following commands:

```
npm i --save strong-params

// and then add the strong params middleware in your application index/app js file.
const params = require('strong-params');
app.use(params.expressMiddleware());

```

Swapper specs OpenAPI(2.0)

Now along with CRUD APIs, it generates the swagger specs as well. There will be a folder named *api-specs* which will caontain *swagger.json* file. Use this file with [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express).

Mount it in *nodejs* server file, usually either *index.js* or *app.js*
```
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./api-specs/swagger.json');

app.get('/', (req, res) => res.send('Hello World!'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

```

visit */api-specs* from your web browser to see the specs generated.

**Note**: if you use the *--force* option then it will regenrate the swagger specs as well along with controller and other code.

### Whats coming?
- [x] Strong params implementation (*Released in version 1.1.0*)
- [x] Swagger API specs - OpenAPI 2.0 (*Released in version 2.0.0*)
- [ ] Integration tests for controller
- [ ] Integration tests for service
