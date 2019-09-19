# express-scaffold
This package will provide scaffold functionality similar to rails scaffold generator which can be used to create the controller, model, service and migration.

**Note**: This is an extention to sequelize-cli package, hence will only work to support sequelize ORM for now.

### How to use?
Set the controllers, models, and services path in your *.sequelizerc* file

**Step 1.**
```
const path = require('path');

module.exports = {
  'controllers-path': path.resolve('app', 'controllers'),
  'models-path': path.resolve('app', 'models'),
  'services-path': path.resolve('lib', 'services')
}
```

**Step 2.**
```
npm install --save-dev @naveen.agarwal/express-scaffold
./node_modules/.bin/scaffold  --force --name User --attributes firstName:string,lastName:string
// above command syntax is same as sequelize-cli model creation syntax
```

The above command will generate the following files:
```
models/user.js
migraitons/{TimeStamp}-create-user.js
controllers/user-controller.js
lib/services/base-service.js // if not already exists
lib/services/user-service.js
```