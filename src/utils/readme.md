Instalaciónes

Nest.js
Comando: npm i -g @nestjs/cli

Mongoose
Comando: npm install @nestjs/mongoose mongoose

Class Validator
Comando: npm install class-validator

Class Transformer
Comando: npm install class-transformer

TS Node
Comando: npm install -g ts-node
Descripción: Permite ejecutar archivos .ts directamente sin necesidad de compilarlos a .js

Gestión de sesiones y seguridad ------------------

Módulo de JWT
Comando: npm install @nestjs/jwt

bcrypt
Comando: npm install bcrypt
Descripción: Gestión de la encriptación de contraseñas

swagger
Comando: npm install --save @nestjs/swagger swagger-ui-express
Descripción: Pruebas y documentación
URL Doc: http://localhost:3000/api/docs

LANZAR EL PROYECTO -------------------------------
cd ./we-reader
npm run start:dev
http://localhost:3000


RESET Database -----------------------------------

BOOK MODEL
cd ./we-reader
ts-node src/database/seed-books.ts

USER MODEL
cd ./we-reader
ts-node src/database/seed-users.ts

Limpiar caché eslint: npx eslint --fix