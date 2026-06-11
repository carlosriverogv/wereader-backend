<!-- =========================================
 WE READER API - BACKEND DOCUMENTATION
 NestJS + MongoDB + JWT
 ========================================= -->

<div align="center">

  <img src="https://nestjs.com/img/logo-small.svg" width="120"/>

  <h1>📚 WeReader API – Backend</h1>

  <p>
    API REST para plataforma de lectura digital social desarrollada en NestJS.
  </p>

  <p>
    <b>NestJS</b> · <b>TypeScript</b> · <b>MongoDB</b> · <b>JWT</b>
  </p>

</div>

<hr/>

<!-- =========================================
  DESCRIPCIÓN
========================================= -->

<h2>🚀 Descripción</h2>

<p>
WeReader API es el backend de una plataforma de lectura digital que permite:
</p>

<ul>
  <li>Gestión de usuarios y autenticación JWT</li>
  <li>Biblioteca personal sincronizada</li>
  <li>Tienda de libros digitales</li>
  <li>Sistema de amigos y biblioteca compartida</li>
  <li>Lectura EPUB integrada en frontend (Readium)</li>
</ul>

<hr/>

<!-- =========================================
  ARQUITECTURA
========================================= -->

<h2>🧱 Arquitectura del sistema</h2>

<ul>
  <li><b>Auth Module</b> → JWT authentication</li>
  <li><b>Users Module</b> → Perfil de usuario</li>
  <li><b>Books Module</b> → Catálogo de libros</li>
  <li><b>Library Module</b> → Biblioteca personal</li>
  <li><b>Friends Module</b> → Sistema social</li>
  <li><b>Store Module</b> → Compra de libros</li>
</ul>

<hr/>

<!-- =========================================
  STACK
========================================= -->

<h2>🧠 Stack tecnológico</h2>

<ul>
  <li>NestJS</li>
  <li>TypeScript</li>
  <li>MongoDB + Mongoose</li>
  <li>JWT Authentication</li>
  <li>Bcrypt</li>
  <li>Class Validator</li>
</ul>

<hr/>

<!-- =========================================
  AUTH
========================================= -->

<h2>🔐 Autenticación</h2>

<p>La API utiliza JWT (Bearer Token):</p>

<pre><code>Authorization: Bearer &lt;token&gt;</code></pre>

<h3>📌 Registro</h3>

<pre><code>POST /auth/register</code></pre>

<b>Request:</b>
<pre><code>{
  "tag": "@usuario123",
  "name": "Carlos",
  "lastname": "Rivero",
  "avatar": 1,
  "email": "test@wereader.com",
  "password": "123456",
  "genderFav": "Fantasía",
  "authorFav": "Brandon Sanderson"
}</code></pre>

<b>Response:</b>
<pre><code>{
  "message": "User created successfully",
  "token": "jwt_token",
  "userId": "64f1c2..."
}</code></pre>

<hr/>

<h3>🔒 Login</h3>

<pre><code>POST /auth/login</code></pre>

<b>Request:</b>
<pre><code>{
  "email": "test@wereader.com",
  "password": "123456"
}</code></pre>

<b>Responses:</b>
<h4>✅ 201 Authorized</h4>
<pre><code>{
  "success": true,
  "message": "Inicio de sesión exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imthcmxvcy5yaXZlcm9nQGdtYWlsLmNvbSIsInN1YiI6IjY3ZTU0NDUzZmFlNDgwODViMzdhMjhjZSIsImlhdCI6MTc4MTIwNjA5MCwiZXhwIjoxNzg0ODA2MDkwfQ.flAcQdpZw1XSlWsPWarK0Fm9YcGGXc6jzI0Dva15dpo"
}</code></pre>

<h4>❌ 401 Error: Unauthorized</h4>
<pre><code>{
  "message": "Unauthorized",
  "statusCode": 401
}</code></pre>

<hr/>

<!-- =========================================
 USERS
========================================= -->

<h2>👤 Users</h2>

<h3>GET perfil</h3>
<pre><code>GET /users/:id</code></pre>

<pre><code>{
  "id": "64f1c2...",
  "name": "Carlos",
  "lastname": "Rivero",
  "avatar": "avatar1"
}</code></pre>

<h3>PUT actualizar usuario</h3>
<pre><code>PUT /users/:id</code></pre>

<pre><code>{
  "name": "Carlos Updated",
  "avatar": "avatar2"
}</code></pre>

<hr/>

<!-- =========================================
 BOOKS
========================================= -->

<h2>📚 Books</h2>

<h3>GET libros</h3>
<pre><code>GET /books</code></pre>

<pre><code>[
  {
    "id": "b1",
    "title": "El Nombre del Viento",
    "author": "Patrick Rothfuss",
    "price": 9.99
  }
]</code></pre>

<h3>GET libro por ID</h3>
<pre><code>GET /books/:id</code></pre>

<h3>GET búsqueda</h3>
<pre><code>GET /books/search?query=fantasia</code></pre>

<hr/>

<!-- =========================================
 LIBRARY
========================================= -->

<h2>📖 Library</h2>

<h3>GET biblioteca usuario</h3>
<pre><code>GET /library/:userId</code></pre>

<pre><code>{
  "userId": "64f1c2...",
  "books": [
    {
      "bookId": "b1",
      "status": "reading",
      "progress": 45,
      "mine": true
    }
  ]
}</code></pre>

<h3>POST añadir libro</h3>
<pre><code>POST /library/add</code></pre>

<pre><code>{
  "userId": "64f1c2...",
  "bookId": "b1"
}</code></pre>

<h3>PUT progreso lectura</h3>
<pre><code>PUT /library/progress</code></pre>

<pre><code>{
  "userId": "64f1c2...",
  "bookId": "b1",
  "progress": 78
}</code></pre>

<hr/>

<!-- =========================================
 FRIENDS
========================================= -->

<h2>🤝 Friends</h2>

<h3>POST solicitud amistad</h3>
<pre><code>POST /friends/request</code></pre>

<pre><code>{
  "from": "user1",
  "to": "user2"
}</code></pre>

<h3>PUT aceptar</h3>
<pre><code>PUT /friends/accept</code></pre>

<h3>PUT rechazar</h3>
<pre><code>PUT /friends/reject</code></pre>

<h3>DELETE eliminar amigo</h3>
<pre><code>DELETE /friends/:id</code></pre>

<hr/>

<!-- =========================================
 STORE
========================================= -->

<h2>🛒 Store</h2>

<h3>GET tienda</h3>
<pre><code>GET /store</code></pre>

<h3>POST comprar libro</h3>
<pre><code>POST /store/buy</code></pre>

<pre><code>{
  "userId": "64f1c2...",
  "bookId": "b1"
}</code></pre>

<pre><code>{
  "message": "Book added to library"
}</code></pre>

<hr/>

<!-- =========================================
 SWAGGER
========================================= -->

<h2>📡 Swagger (OpenAPI)</h2>

<p>Activación en NestJS:</p>

<pre><code>npm install @nestjs/swagger swagger-ui-express</code></pre>

<pre><code>
const config = new DocumentBuilder()
  .setTitle('WeReader API')
  .setDescription('API REST de lectura digital social')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

SwaggerModule.setup('api', app, document);
</code></pre>

<p>
🔗 Acceso: <code>http://localhost:3000/api</code>
</p>

<hr/>

<!-- =========================================
 DIAGRAMA
========================================= -->

<h2>📊 Arquitectura del sistema</h2>

<pre><code class="language-mermaid">
graph TD
  A[Android App] --> B[NestJS API]

  B --> C[Auth]
  B --> D[Users]
  B --> E[Books]
  B --> F[Library]
  B --> G[Friends]
  B --> H[Store]

  C --> I[(MongoDB)]
  D --> I
  E --> I
  F --> I
  G --> I
  H --> I
</code></pre>

<hr/>

<!-- =========================================
 CIERRE
========================================= -->

<h2>🚀 Futuras mejoras</h2>

<ul>
  <li>WebSockets en tiempo real</li>
  <li>Sistema de recomendaciones IA</li>
  <li>Pagos reales (Stripe / Bizum)</li>
  <li>Microservicios</li>
  <li>Redis cache</li>
</ul>

<hr/>

<!-- ========================================= -->

<p align="center">
  <b>WeReader API – Proyecto académico | 2025</b>
</p>
