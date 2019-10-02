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

### Whats coming?
- [x] Strong params implementation (*Released in version 1.1.0*)
- [ ] Swagger API specs
- [ ] Integration tests for controller
- [ ] Integration tests for service
