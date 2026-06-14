<!-- =========================================
 WE READER API - BACKEND DOCUMENTATION
 NestJS + MongoDB + JWT
 ========================================= -->

<div align="center">

  <img src="https://nestjs.com/img/logo-small.svg" width="120"/>

  <h1>WeReader API - Backend</h1>

  <p>
    API REST para plataforma de lectura digital social desarrollada en NestJS.
  </p>

  <p>
    <b>NestJS</b> &middot; <b>TypeScript</b> &middot; <b>MongoDB</b> &middot; <b>JWT</b>
  </p>

</div>

<hr/>

<!-- =========================================
  DESCRIPCION
========================================= -->

<h2>🚀 Descripcion</h2>

<p>
WeReader API es el backend de una plataforma de lectura digital que permite:
</p>

<ul>
  <li>Gestion de usuarios y autenticacion JWT</li>
  <li>Biblioteca personal sincronizada</li>
  <li>Catalogo de libros digitales</li>
  <li>Sistema de amigos y biblioteca compartida</li>
  <li>Lectura EPUB integrada en frontend (Readium)</li>
</ul>

<hr/>

<!-- =========================================
  ARQUITECTURA
========================================= -->

<h2>🧱 Arquitectura del sistema</h2>

<ul>
  <li><b>App Module</b> &rarr; endpoint raiz de salud/respuesta base</li>
  <li><b>Auth Module</b> &rarr; login, registro y emision de JWT</li>
  <li><b>User Module</b> &rarr; perfil, busqueda y eliminacion de usuarios</li>
  <li><b>Book Module</b> &rarr; catalogo, busqueda, recomendaciones y CRUD de libros</li>
  <li><b>Library Module</b> &rarr; biblioteca personal y compra/anadido de libros</li>
  <li><b>Friendship Module</b> &rarr; solicitudes, aceptacion, rechazo y listado de amigos</li>
  <li><b>SharedLibrary Module</b> &rarr; prestamo/comparticion de bibliotecas entre amigos</li>
</ul>

<hr/>

<!-- =========================================
  STACK
========================================= -->

<h2>🧠 Stack tecnologico</h2>

<ul>
  <li>NestJS</li>
  <li>TypeScript</li>
  <li>MongoDB + Mongoose</li>
  <li>JWT Authentication</li>
  <li>Bcrypt</li>
  <li>Class Validator</li>
  <li>Swagger / OpenAPI</li>
</ul>

<hr/>

<!-- =========================================
  DOCUMENTACION API
========================================= -->

<h2>Documentacion completa de la API</h2>

<p>
Base URL local por defecto: <code>http://localhost:3000</code>.
</p>

<p>
Los endpoints protegidos usan JWT mediante la cabecera:
</p>

<pre><code>Authorization: Bearer &lt;token&gt;</code></pre>

<p>
La aplicacion usa <code>ValidationPipe</code> global con <code>whitelist: true</code> y <code>forbidNonWhitelisted: true</code>. Los DTOs rechazan campos desconocidos y datos que no cumplan sus validaciones.
</p>

<h3>Tabla resumen de endpoints</h3>

<table>
  <thead>
    <tr>
      <th>Modulo</th>
      <th>Metodo</th>
      <th>Ruta</th>
      <th>Protegido</th>
      <th>Descripcion</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>App</td><td>GET</td><td><code>/</code></td><td>Si</td><td>Respuesta base de la API</td></tr>
    <tr><td>Auth</td><td>POST</td><td><code>/auth/login</code></td><td>No</td><td>Iniciar sesion</td></tr>
    <tr><td>Auth</td><td>POST</td><td><code>/auth/register</code></td><td>No</td><td>Registrar usuario y crear su biblioteca</td></tr>
    <tr><td>User</td><td>GET</td><td><code>/user/profile</code></td><td>Si</td><td>Obtener perfil del usuario autenticado</td></tr>
    <tr><td>User</td><td>GET</td><td><code>/user/search/:tag</code></td><td>Si</td><td>Buscar usuarios por coincidencia de tag</td></tr>
    <tr><td>User</td><td>GET</td><td><code>/user/:id</code></td><td>Si</td><td>Obtener perfil por ID</td></tr>
    <tr><td>User</td><td>DELETE</td><td><code>/user/:id</code></td><td>Si</td><td>Eliminar usuario por ID</td></tr>
    <tr><td>Book</td><td>POST</td><td><code>/book</code></td><td>Si</td><td>Anadir un nuevo libro</td></tr>
    <tr><td>Book</td><td>GET</td><td><code>/book</code></td><td>Si</td><td>Listar todos los libros</td></tr>
    <tr><td>Book</td><td>GET</td><td><code>/book/search?query=fantasia</code></td><td>Si</td><td>Buscar por titulo, autor, genero o ISBN</td></tr>
    <tr><td>Book</td><td>GET</td><td><code>/book/newReleases</code></td><td>Si</td><td>Listar libros publicados mas recientemente</td></tr>
    <tr><td>Book</td><td>GET</td><td><code>/book/bestsellers</code></td><td>Si</td><td>Listar libros mas descargados</td></tr>
    <tr><td>Book</td><td>GET</td><td><code>/book/recommended</code></td><td>Si</td><td>Listar recomendaciones para el usuario</td></tr>
    <tr><td>Book</td><td>GET</td><td><code>/book/:id</code></td><td>Si</td><td>Buscar libro por ID</td></tr>
    <tr><td>Book</td><td>GET</td><td><code>/book/search/:isbn</code></td><td>Si</td><td>Buscar libro por ISBN</td></tr>
    <tr><td>Book</td><td>GET</td><td><code>/book/search/title/:title</code></td><td>Si</td><td>Buscar libros por titulo exacto</td></tr>
    <tr><td>Book</td><td>GET</td><td><code>/book/search/author/:author</code></td><td>Si</td><td>Buscar libros por autor exacto</td></tr>
    <tr><td>Book</td><td>GET</td><td><code>/book/search/genre/:genre</code></td><td>Si</td><td>Buscar libros por genero exacto</td></tr>
    <tr><td>Book</td><td>PATCH</td><td><code>/book/:id</code></td><td>Si</td><td>Actualizar un libro</td></tr>
    <tr><td>Book</td><td>DELETE</td><td><code>/book/:id</code></td><td>Si</td><td>Eliminar un libro</td></tr>
    <tr><td>Library</td><td>POST</td><td><code>/library</code></td><td>Si</td><td>Crear una biblioteca</td></tr>
    <tr><td>Library</td><td>GET</td><td><code>/library/mylibrary</code></td><td>Si</td><td>Obtener biblioteca propia</td></tr>
    <tr><td>Library</td><td>GET</td><td><code>/library/:idOwner</code></td><td>Si</td><td>Obtener biblioteca por usuario</td></tr>
    <tr><td>Library</td><td>PATCH</td><td><code>/library/addBook</code></td><td>Si</td><td>Anadir/comprar libro para la biblioteca propia</td></tr>
    <tr><td>Library</td><td>DELETE</td><td><code>/library/:id</code></td><td>Si</td><td>Eliminar biblioteca por ID</td></tr>
    <tr><td>Friendship</td><td>POST</td><td><code>/friendship</code></td><td>Si</td><td>Enviar solicitud de amistad</td></tr>
    <tr><td>Friendship</td><td>GET</td><td><code>/friendship/myFriends</code></td><td>Si</td><td>Listar amigos aceptados</td></tr>
    <tr><td>Friendship</td><td>GET</td><td><code>/friendship/receivedRequestFriendships</code></td><td>Si</td><td>Listar solicitudes recibidas</td></tr>
    <tr><td>Friendship</td><td>PATCH</td><td><code>/friendship/accept</code></td><td>Si</td><td>Aceptar solicitud</td></tr>
    <tr><td>Friendship</td><td>PATCH</td><td><code>/friendship/reject</code></td><td>Si</td><td>Rechazar solicitud</td></tr>
    <tr><td>Friendship</td><td>POST</td><td><code>/friendship/deleteMyFriendship</code></td><td>Si</td><td>Eliminar amistad con un usuario</td></tr>
    <tr><td>SharedLibrary</td><td>POST</td><td><code>/sharedLibrary</code></td><td>Si</td><td>Compartir biblioteca con un amigo</td></tr>
    <tr><td>SharedLibrary</td><td>GET</td><td><code>/sharedLibrary/sharedWithMe</code></td><td>Si</td><td>Obtener biblioteca compartida conmigo</td></tr>
    <tr><td>SharedLibrary</td><td>GET</td><td><code>/sharedLibrary/sharedByMe</code></td><td>Si</td><td>Obtener biblioteca que comparto</td></tr>
    <tr><td>SharedLibrary</td><td>POST</td><td><code>/sharedLibrary/stopSharingMyLibrary</code></td><td>Si</td><td>Dejar de compartir mi biblioteca</td></tr>
  </tbody>
</table>

<hr/>

<!-- =========================================
 AUTH
========================================= -->

<h2>🔐 Modulo Auth</h2>

<details>
<summary><b>POST /auth/login</b> - Iniciar sesion</summary>

<p><b>Descripcion:</b> Valida email y contrasena; si son correctos devuelve un token JWT.</p>
<p><b>DTO de entrada:</b> <code>LoginDto</code> (<code>email</code>, <code>password</code>).</p>

<b>Request JSON:</b>
<pre><code>{
  "email": "karlos.riverog@gmail.com",
  "password": "MyPassword23&"
}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "success": true,
  "message": "Inicio de sesion exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}</code></pre>

<p><b>Codigos de error posibles:</b> 400 por validacion del DTO, 401 si las credenciales no son validas, 500 si falla la busqueda del usuario.</p>
</details>

<details>
<summary><b>POST /auth/register</b> - Registrar un usuario con biblioteca inicial</summary>

<p><b>Descripcion:</b> Crea un usuario, cifra la contrasena con bcrypt y genera una biblioteca vacia asociada.</p>
<p><b>DTO de entrada:</b> <code>CreateUserDto</code>.</p>

<b>Request JSON:</b>
<pre><code>{
  "tag": "@usuario",
  "name": "Carlos",
  "lastname": "Rivero",
  "avatar": 1,
  "email": "emailuser@gmail.com",
  "password": "MyPassword23&",
  "genreFav": "Fantasia",
  "authorFav": "Brandon Sanderson"
}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "success": true,
  "message": "Registro de usuario exitoso",
  "user": {
    "_id": "67e54453fae48085b37a28ce",
    "tag": "@usuario",
    "name": "Carlos",
    "lastname": "Rivero",
    "avatar": 1,
    "email": "emailuser@gmail.com",
    "genreFav": "Fantasia",
    "authorFav": "Brandon Sanderson",
    "__v": 0
  }
}</code></pre>

<p><b>Codigos de error posibles:</b> 400 por validacion del DTO, 409 si ya existe un usuario con el email indicado, 500 si ocurre un error inesperado creando usuario o biblioteca.</p>
</details>

<hr/>

<!-- =========================================
 USER
========================================= -->

<h2>👤 Modulo User</h2>

<details>
<summary><b>GET /user/profile</b> - Obtener perfil del usuario autenticado</summary>

<p><b>Descripcion:</b> Lee el identificador <code>sub</code> del JWT y devuelve el perfil del usuario.</p>
<p><b>DTO de entrada:</b> No usa DTO. Requiere JWT.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "_id": "67e54453fae48085b37a28ce",
  "tag": "@usuario",
  "name": "Carlos",
  "lastname": "Rivero",
  "avatar": 1,
  "email": "emailuser@gmail.com",
  "genreFav": "Fantasia",
  "authorFav": "Brandon Sanderson"
}</code></pre>

<p><b>Codigos de error posibles:</b> 401 si no hay token, el token es invalido o no contiene <code>sub</code>; 404 si no existe el usuario; 500 si falla la consulta.</p>
</details>

<details>
<summary><b>GET /user/search/:tag</b> - Buscar usuarios por coincidencia de tag</summary>

<p><b>Descripcion:</b> Busca hasta 10 usuarios cuyo tag coincida parcial o totalmente. Excluye al usuario autenticado y a sus amistades aceptadas.</p>
<p><b>DTO de entrada:</b> No usa DTO. Parametro path <code>tag</code>.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>[
  {
    "_id": "67e54493fae48085b37a28d1",
    "tag": "@lector2",
    "name": "Noel",
    "lastname": "Soriano",
    "avatar": 4,
    "email": "noel@example.com",
    "genreFav": "Thriller",
    "authorFav": "Paul Pen"
  }
]</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 500 si ocurre un error inesperado buscando usuarios.</p>
</details>

<details>
<summary><b>GET /user/:id</b> - Obtener perfil de usuario por ID</summary>

<p><b>Descripcion:</b> Devuelve el perfil publico de un usuario concreto.</p>
<p><b>DTO de entrada:</b> No usa DTO. Parametro path <code>id</code>.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "_id": "67e54453fae48085b37a28ce",
  "tag": "@usuario",
  "name": "Carlos",
  "lastname": "Rivero",
  "avatar": 1,
  "email": "emailuser@gmail.com",
  "genreFav": "Fantasia",
  "authorFav": "Brandon Sanderson"
}</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 404 si no existe el usuario; 500 si falla la consulta.</p>
</details>

<details>
<summary><b>DELETE /user/:id</b> - Eliminar un usuario por ID</summary>

<p><b>Descripcion:</b> Elimina el usuario indicado por parametro.</p>
<p><b>DTO de entrada:</b> No usa DTO. Parametro path <code>id</code>.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "ok": true,
  "message": "Usuario eliminado correctamente",
  "result": {
    "_id": "67e54453fae48085b37a28ce",
    "tag": "@usuario",
    "name": "Carlos",
    "lastname": "Rivero",
    "avatar": 1,
    "email": "emailuser@gmail.com"
  }
}</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 404 si no existe el usuario; 500 si falla la eliminacion.</p>
</details>

<hr/>

<!-- =========================================
 BOOK
========================================= -->

<h2>📚 Modulo Book</h2>

<details>
<summary><b>POST /book</b> - Anadir un nuevo libro</summary>

<p><b>Descripcion:</b> Inserta un libro nuevo en el catalogo. El ISBN debe ser unico.</p>
<p><b>DTO de entrada:</b> <code>CreateBookDto</code>.</p>

<b>Request JSON:</b>
<pre><code>{
  "isbn": "978-8419507907",
  "title": "La historia interminable",
  "author": "Michael Ende",
  "price": 7.59,
  "epubUrl": "epubs/",
  "coverUrl": "covers/lhi-me.jpg",
  "genre": "Fantasia",
  "datePublished": "1983-09-01",
  "synopsis": "La historia de Bastian Baltasar Bux",
  "shareable": true
}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "ok": true,
  "resultado": {
    "_id": "67c74e8be06e6877612e7b35",
    "isbn": "978-8419507907",
    "title": "La historia interminable",
    "author": "Michael Ende",
    "price": 7.59,
    "epubUrl": "epubs/",
    "coverUrl": "covers/lhi-me.jpg",
    "genre": "Fantasia",
    "datePublished": "1983-09-01T00:00:00.000Z",
    "synopsis": "La historia de Bastian Baltasar Bux",
    "shareable": true,
    "downloads": 0,
    "dateCreation": "2026-06-14T17:55:00.000Z"
  }
}</code></pre>

<p><b>Codigos de error posibles:</b> 400 por validacion del DTO; 401 si falla la autenticacion; 409 si ya existe un libro con ese ISBN; 500 si falla la creacion.</p>
</details>

<details>
<summary><b>GET /book</b> - Listar todos los libros</summary>

<p><b>Descripcion:</b> Devuelve todos los libros del catalogo.</p>
<p><b>DTO de entrada:</b> No usa DTO.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>[
  {
    "_id": "67c74e8be06e6877612e7b35",
    "isbn": "978-84-17347-29-1",
    "title": "Nacidos de la bruma 1: El Imperio Final",
    "author": "Brandon Sanderson",
    "price": 12.5,
    "epubUrl": "epubs/978-84-17347-29-1.epub",
    "coverUrl": "covers/eif-bs-m1.jpg",
    "genre": "Fantasia",
    "datePublished": "2006-07-17T00:00:00.000Z",
    "shareable": true,
    "downloads": 167
  }
]</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 500 si falla la busqueda.</p>
</details>

<details>
<summary><b>GET /book/search?query=fantasia</b> - Buscar libros por texto</summary>

<p><b>Descripcion:</b> Busca por coincidencia en <code>title</code>, <code>author</code>, <code>genre</code> o <code>isbn</code>. Devuelve maximo 25 resultados ordenados por descargas.</p>
<p><b>DTO de entrada:</b> No usa DTO. Query param <code>query</code>.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>[
  {
    "_id": "67c74e8be06e6877612e7b35",
    "isbn": "978-84-17347-29-1",
    "title": "Nacidos de la bruma 1: El Imperio Final",
    "author": "Brandon Sanderson",
    "genre": "Fantasia",
    "downloads": 167,
    "shareable": true
  }
]</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 500 si falla la busqueda.</p>
</details>

<details>
<summary><b>GET /book/newReleases</b> - Listar novedades</summary>

<p><b>Descripcion:</b> Devuelve hasta 20 libros con fecha de publicacion, ordenados de mas recientes a mas antiguos.</p>
<p><b>DTO de entrada:</b> No usa DTO.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>[
  {
    "_id": "67c74e8be06e6877612e7b42",
    "isbn": "978-8410080577",
    "title": "No mientas",
    "author": "Arturo del Burgo",
    "genre": "Thriller",
    "datePublished": "2024-12-19T00:00:00.000Z",
    "downloads": 325
  }
]</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 500 si falla la consulta.</p>
</details>

<details>
<summary><b>GET /book/bestsellers</b> - Listar mas descargados</summary>

<p><b>Descripcion:</b> Devuelve hasta 20 libros ordenados por <code>downloads</code> descendente.</p>
<p><b>DTO de entrada:</b> No usa DTO.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>[
  {
    "_id": "67c74e8be06e6877612e7b42",
    "isbn": "978-8410080577",
    "title": "No mientas",
    "author": "Arturo del Burgo",
    "genre": "Thriller",
    "downloads": 325,
    "shareable": true
  }
]</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 500 si falla la consulta.</p>
</details>

<details>
<summary><b>GET /book/recommended</b> - Listar recomendaciones para el usuario</summary>

<p><b>Descripcion:</b> Usa <code>authorFav</code> y <code>genreFav</code> del usuario autenticado para devolver hasta 20 libros recomendados.</p>
<p><b>DTO de entrada:</b> No usa DTO. Requiere JWT.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>[
  {
    "_id": "67c74e8be06e6877612e7b35",
    "title": "Nacidos de la bruma 1: El Imperio Final",
    "author": "Brandon Sanderson",
    "genre": "Fantasia",
    "downloads": 167
  }
]</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion o el JWT no contiene <code>sub</code>; 404 si no existe el usuario autenticado; 500 si falla la recomendacion.</p>
</details>

<details>
<summary><b>GET /book/:id</b> - Buscar libro por ID</summary>

<p><b>Descripcion:</b> Devuelve un libro concreto por su ObjectId.</p>
<p><b>DTO de entrada:</b> No usa DTO. Parametro path <code>id</code>.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "_id": "67c74e8be06e6877612e7b35",
  "isbn": "978-8419507907",
  "title": "La historia interminable",
  "author": "Michael Ende",
  "price": 7.59,
  "epubUrl": "epubs/",
  "coverUrl": "covers/lhi-me.jpg",
  "genre": "Fantasia",
  "datePublished": "1983-09-01T00:00:00.000Z",
  "shareable": true,
  "downloads": 24
}</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 404 si no existe el libro; 500 si falla la busqueda.</p>
</details>

<details>
<summary><b>GET /book/search/:isbn</b> - Buscar libro por ISBN</summary>

<p><b>Descripcion:</b> Devuelve un libro cuyo <code>isbn</code> coincida exactamente.</p>
<p><b>DTO de entrada:</b> No usa DTO. Parametro path <code>isbn</code>.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "_id": "67c74e8be06e6877612e7b35",
  "isbn": "978-84-17347-29-1",
  "title": "Nacidos de la bruma 1: El Imperio Final",
  "author": "Brandon Sanderson",
  "genre": "Fantasia",
  "downloads": 167
}</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 404 si no existe el ISBN; 500 si falla la busqueda.</p>
</details>

<details>
<summary><b>GET /book/search/title/:title</b> - Buscar libros por titulo</summary>

<p><b>Descripcion:</b> Devuelve libros cuyo <code>title</code> coincida exactamente con el parametro.</p>
<p><b>DTO de entrada:</b> No usa DTO. Parametro path <code>title</code>.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>[
  {
    "_id": "67c74e8be06e6877612e7b35",
    "title": "La historia interminable",
    "author": "Michael Ende",
    "genre": "Fantasia"
  }
]</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 500 si falla la busqueda.</p>
</details>

<details>
<summary><b>GET /book/search/author/:author</b> - Buscar libros por autor</summary>

<p><b>Descripcion:</b> Devuelve libros cuyo <code>author</code> coincida exactamente con el parametro.</p>
<p><b>DTO de entrada:</b> No usa DTO. Parametro path <code>author</code>.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>[
  {
    "_id": "67c74e8be06e6877612e7b35",
    "title": "Nacidos de la bruma 1: El Imperio Final",
    "author": "Brandon Sanderson",
    "genre": "Fantasia"
  }
]</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 500 si falla la busqueda.</p>
</details>

<details>
<summary><b>GET /book/search/genre/:genre</b> - Buscar libros por genero</summary>

<p><b>Descripcion:</b> Devuelve libros cuyo <code>genre</code> coincida exactamente con el parametro.</p>
<p><b>DTO de entrada:</b> No usa DTO. Parametro path <code>genre</code>.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>[
  {
    "_id": "67c74e8be06e6877612e7b42",
    "title": "No mientas",
    "author": "Arturo del Burgo",
    "genre": "Thriller"
  }
]</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 500 si falla la busqueda.</p>
</details>

<details>
<summary><b>PATCH /book/:id</b> - Actualizar un libro</summary>

<p><b>Descripcion:</b> Actualiza parcialmente un libro existente.</p>
<p><b>DTO de entrada:</b> <code>UpdateBookDto</code>, derivado parcial de <code>CreateBookDto</code>.</p>

<b>Request JSON:</b>
<pre><code>{
  "price": 9.95,
  "shareable": false,
  "coverUrl": "covers/lhi-me-nueva.jpg"
}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "_id": "67c74e8be06e6877612e7b35",
  "isbn": "978-8419507907",
  "title": "La historia interminable",
  "author": "Michael Ende",
  "price": 9.95,
  "coverUrl": "covers/lhi-me-nueva.jpg",
  "genre": "Fantasia",
  "shareable": false
}</code></pre>

<p><b>Codigos de error posibles:</b> 400 por validacion del DTO; 401 si falla la autenticacion; 404 si no existe el libro; 500 si falla la actualizacion.</p>
</details>

<details>
<summary><b>DELETE /book/:id</b> - Eliminar un libro</summary>

<p><b>Descripcion:</b> Elimina un libro por ObjectId.</p>
<p><b>DTO de entrada:</b> No usa DTO. Parametro path <code>id</code>.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "_id": "67c74e8be06e6877612e7b35",
  "isbn": "978-8419507907",
  "title": "La historia interminable",
  "author": "Michael Ende",
  "genre": "Fantasia"
}</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 404 si no existe el libro; 500 si falla la eliminacion.</p>
</details>

<hr/>

<!-- =========================================
 LIBRARY
========================================= -->

<h2>📖 Modulo Library</h2>

<details>
<summary><b>POST /library</b> - Crear una biblioteca nueva</summary>

<p><b>Descripcion:</b> Crea una biblioteca para un usuario. En el registro ya se crea una biblioteca por defecto.</p>
<p><b>DTO de entrada:</b> <code>CreateLibraryDto</code>.</p>

<b>Request JSON:</b>
<pre><code>{
  "idUser": "67e54453fae48085b37a28ce",
  "books": [
    "67c74e8be06e6877612e7b35",
    "67c74e8be06e6877612e7b36"
  ]
}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "ok": true,
  "resultado": {
    "_id": "67f00000fae48085b37a2900",
    "idUser": "67e54453fae48085b37a28ce",
    "books": [
      "67c74e8be06e6877612e7b35"
    ],
    "dateCreation": "2026-06-14T17:55:00.000Z"
  }
}</code></pre>

<p><b>Codigos de error posibles:</b> 400 por validacion del DTO; 401 si falla la autenticacion; 409 si el usuario ya tiene biblioteca; 500 si falla la creacion.</p>
</details>

<details>
<summary><b>GET /library/mylibrary</b> - Obtener biblioteca del usuario autenticado</summary>

<p><b>Descripcion:</b> Busca la biblioteca cuyo <code>idUser</code> coincide con el <code>sub</code> del JWT y popula sus libros.</p>
<p><b>DTO de entrada:</b> No usa DTO. Requiere JWT.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "_id": "67f00000fae48085b37a2900",
  "idUser": "67e54453fae48085b37a28ce",
  "books": [
    {
      "_id": "67c74e8be06e6877612e7b35",
      "title": "Nacidos de la bruma 1: El Imperio Final",
      "author": "Brandon Sanderson",
      "genre": "Fantasia",
      "shareable": true
    }
  ],
  "dateCreation": "2026-06-14T17:55:00.000Z"
}</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion o el JWT no contiene <code>sub</code>; 500 si no se encuentra la biblioteca o falla la consulta.</p>
</details>

<details>
<summary><b>GET /library/:idOwner</b> - Obtener biblioteca por ID de usuario</summary>

<p><b>Descripcion:</b> Busca una biblioteca por propietario y popula la lista de libros.</p>
<p><b>DTO de entrada:</b> No usa DTO. Parametro path <code>idOwner</code>.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "_id": "67f00000fae48085b37a2900",
  "idUser": "67e54453fae48085b37a28ce",
  "books": [
    {
      "_id": "67c74e8be06e6877612e7b35",
      "title": "La historia interminable",
      "author": "Michael Ende"
    }
  ]
}</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 500 si no se encuentra la biblioteca o falla la consulta.</p>
</details>

<details>
<summary><b>PATCH /library/addBook</b> - Anadir libro a mi biblioteca</summary>

<p><b>Descripcion:</b> Anade el libro a la biblioteca del usuario autenticado con <code>$addToSet</code> e incrementa <code>downloads</code> del libro. Funciona como compra.</p>
<p><b>DTO de entrada:</b> <code>AddBookToLibraryDto</code>.</p>

<b>Request JSON:</b>
<pre><code>{
  "bookId": "67c74e8be06e6877612e7b35"
}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "ok": true,
  "message": "Compra realizada correctamente"
}</code></pre>

<p><b>Codigos de error posibles:</b> 400 por validacion del DTO; 401 si falla la autenticacion o el JWT no contiene <code>sub</code>; 404 si no existe la biblioteca o el libro; 409 si el libro ya esta en la biblioteca; 500 si falla el proceso.</p>
</details>

<details>
<summary><b>DELETE /library/:id</b> - Eliminar biblioteca por ID</summary>

<p><b>Descripcion:</b> Elimina una biblioteca por su identificador.</p>
<p><b>DTO de entrada:</b> No usa DTO. Parametro path <code>id</code>.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "ok": true,
  "resultado": {
    "_id": "67f00000fae48085b37a2900",
    "idUser": "67e54453fae48085b37a28ce",
    "books": []
  }
}</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 404 si no se encuentra la biblioteca; 500 si falla la eliminacion.</p>
</details>

<hr/>

<!-- =========================================
 FRIENDSHIP
========================================= -->

<h2>🤝 Modulo Friendship</h2>

<details>
<summary><b>POST /friendship</b> - Nueva solicitud de amistad</summary>

<p><b>Descripcion:</b> Crea una relacion en estado <code>pending</code> entre el usuario autenticado y el usuario indicado.</p>
<p><b>DTO de entrada:</b> <code>CreateFriendshipDto</code>.</p>

<b>Request JSON:</b>
<pre><code>{
  "idFriendUser": "67e54493fae48085b37a28d1"
}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "ok": true,
  "message": "Solicitud de amistad enviada correctamente"
}</code></pre>

<p><b>Codigos de error posibles:</b> 400 por validacion del DTO o si el usuario se envia solicitud a si mismo; 401 si falla la autenticacion; 409 si ya son amigos o ya existe una solicitud pendiente; 500 si falla la creacion.</p>
</details>

<details>
<summary><b>GET /friendship/myFriends</b> - Obtener amigos del usuario autenticado</summary>

<p><b>Descripcion:</b> Devuelve usuarios relacionados con el autenticado mediante amistades aceptadas.</p>
<p><b>DTO de entrada:</b> No usa DTO. Requiere JWT.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>[
  {
    "_id": "67e54493fae48085b37a28d1",
    "tag": "@lector2",
    "name": "Noel",
    "lastname": "Soriano",
    "avatar": 4,
    "email": "noel@example.com",
    "genreFav": "Thriller",
    "authorFav": "Paul Pen"
  }
]</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 404 si no se encuentra el usuario autenticado, un usuario de la relacion o el amigo; 500 si falla la consulta.</p>
</details>

<details>
<summary><b>GET /friendship/receivedRequestFriendships</b> - Obtener solicitudes recibidas</summary>

<p><b>Descripcion:</b> Devuelve usuarios que han enviado solicitudes pendientes al usuario autenticado.</p>
<p><b>DTO de entrada:</b> No usa DTO. Requiere JWT.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>[
  {
    "_id": "67e54493fae48085b37a28d1",
    "tag": "@lector2",
    "name": "Noel",
    "lastname": "Soriano",
    "avatar": 4
  }
]</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 404 si no se encuentra el usuario autenticado o un remitente; 500 si falla la consulta.</p>
</details>

<details>
<summary><b>PATCH /friendship/accept</b> - Aceptar solicitud de amistad</summary>

<p><b>Descripcion:</b> Cambia a <code>accepted</code> una solicitud pendiente enviada por el usuario indicado al usuario autenticado.</p>
<p><b>DTO de entrada:</b> <code>BaseFriendshipDto</code>.</p>

<b>Request JSON:</b>
<pre><code>{
  "idFriendUser": "67e54493fae48085b37a28d1"
}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "ok": true,
  "message": "Solicitud de amistad aceptada correctamente"
}</code></pre>

<p><b>Codigos de error posibles:</b> 400 por validacion del DTO; 401 si falla la autenticacion; 404 si no existe una solicitud pendiente para aceptar; 500 si falla la actualizacion.</p>
</details>

<details>
<summary><b>PATCH /friendship/reject</b> - Rechazar solicitud de amistad</summary>

<p><b>Descripcion:</b> Cambia a <code>rejected</code> una solicitud pendiente enviada por el usuario indicado al usuario autenticado.</p>
<p><b>DTO de entrada:</b> <code>BaseFriendshipDto</code>.</p>

<b>Request JSON:</b>
<pre><code>{
  "idFriendUser": "67e54493fae48085b37a28d1"
}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "ok": true,
  "message": "Solicitud de amistad rechazada correctamente",
  "friendship": {
    "_id": "67f10000fae48085b37a2901",
    "idUser1": "67e54493fae48085b37a28d1",
    "idUser2": "67e54453fae48085b37a28ce",
    "status": "rejected",
    "dateCreation": "2026-06-14T17:55:00.000Z"
  }
}</code></pre>

<p><b>Codigos de error posibles:</b> 400 por validacion del DTO; 401 si falla la autenticacion; 404 si no existe una solicitud pendiente para rechazar; 500 si falla la actualizacion.</p>
</details>

<details>
<summary><b>POST /friendship/deleteMyFriendship</b> - Eliminar una amistad</summary>

<p><b>Descripcion:</b> Elimina la amistad entre el usuario autenticado y el usuario indicado. Tambien elimina bibliotecas compartidas asociadas entre ambos.</p>
<p><b>DTO de entrada:</b> <code>BaseFriendshipDto</code>.</p>

<b>Request JSON:</b>
<pre><code>{
  "idFriendUser": "67e54493fae48085b37a28d1"
}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "ok": true,
  "message": "Amistad eliminada correctamente"
}</code></pre>

<p><b>Codigos de error posibles:</b> 400 por validacion del DTO o ID de amigo no valido; 401 si falla la autenticacion; 404 si no existe el usuario autenticado o la amistad; 500 si falla la eliminacion.</p>
</details>

<hr/>

<!-- =========================================
 SHARED LIBRARY
========================================= -->

<h2>📖🤝Modulo SharedLibrary</h2>

<details>
<summary><b>POST /sharedLibrary</b> - Compartir biblioteca</summary>

<p><b>Descripcion:</b> Crea una biblioteca compartida entre el usuario autenticado y un amigo. Requiere amistad aceptada, biblioteca del propietario y que no haya otra comparticion activa incompatible.</p>
<p><b>DTO de entrada:</b> <code>CreateSharedLibraryDto</code>.</p>

<b>Request JSON:</b>
<pre><code>{
  "idUserFriend": "67e54493fae48085b37a28d1"
}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "ok": true,
  "message": "Biblioteca compartida correctamente",
  "resultado": {
    "_id": "67f20000fae48085b37a2902",
    "idUserOwner": "67e54453fae48085b37a28ce",
    "idUserFriend": "67e54493fae48085b37a28d1",
    "idLibrary": "67f00000fae48085b37a2900",
    "dateAuthorization": "2026-06-14T17:55:00.000Z"
  }
}</code></pre>

<p><b>Codigos de error posibles:</b> 400 por validacion del DTO; 401 si falla la autenticacion; 404 si no existe amistad aceptada o biblioteca del propietario; 409 si el propietario ya comparte biblioteca o el amigo ya recibio una biblioteca; 500 si falla la creacion.</p>
</details>

<details>
<summary><b>GET /sharedLibrary/sharedWithMe</b> - Obtener biblioteca compartida conmigo</summary>

<p><b>Descripcion:</b> Devuelve la biblioteca compartida recibida por el usuario autenticado, populando propietario y solo libros compartibles (<code>shareable: true</code>).</p>
<p><b>DTO de entrada:</b> No usa DTO. Requiere JWT.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "_id": "67f20000fae48085b37a2902",
  "idUserOwner": {
    "_id": "67e54453fae48085b37a28ce",
    "name": "Carlos",
    "tag": "@usuario"
  },
  "idUserFriend": "67e54493fae48085b37a28d1",
  "idLibrary": {
    "_id": "67f00000fae48085b37a2900",
    "books": [
      {
        "_id": "67c74e8be06e6877612e7b35",
        "title": "Nacidos de la bruma 1: El Imperio Final",
        "author": "Brandon Sanderson",
        "shareable": true
      }
    ]
  },
  "dateAuthorization": "2026-06-14T17:55:00.000Z"
}</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 404 si no hay biblioteca compartida con el usuario autenticado; 500 si falla la consulta.</p>
</details>

<details>
<summary><b>GET /sharedLibrary/sharedByMe</b> - Obtener biblioteca compartida por mi</summary>

<p><b>Descripcion:</b> Devuelve la biblioteca que el usuario autenticado esta compartiendo. Si no hay ninguna, devuelve <code>sharedLibrary: null</code>.</p>
<p><b>DTO de entrada:</b> No usa DTO. Requiere JWT.</p>

<b>Request JSON:</b>
<pre><code>{}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "sharedLibrary": {
    "_id": "67f20000fae48085b37a2902",
    "idUserOwner": "67e54453fae48085b37a28ce",
    "idUserFriend": "67e54493fae48085b37a28d1",
    "idLibrary": "67f00000fae48085b37a2900",
    "dateAuthorization": "2026-06-14T17:55:00.000Z"
  }
}</code></pre>

<b>Response JSON sin comparticion activa:</b>
<pre><code>{
  "sharedLibrary": null
}</code></pre>

<p><b>Codigos de error posibles:</b> 401 si falla la autenticacion; 500 si falla la consulta.</p>
</details>

<details>
<summary><b>POST /sharedLibrary/stopSharingMyLibrary</b> - Dejar de compartir mi biblioteca</summary>

<p><b>Descripcion:</b> Elimina la biblioteca compartida enviada por el usuario autenticado al usuario indicado.</p>
<p><b>DTO de entrada:</b> <code>DeleteSharedLibraryDto</code>.</p>

<b>Request JSON:</b>
<pre><code>{
  "idOtherUser": "67e54493fae48085b37a28d1"
}</code></pre>

<b>Response JSON:</b>
<pre><code>{
  "ok": true,
  "message": "Has dejado de compartir tu biblioteca con ese usuario"
}</code></pre>

<p><b>Codigos de error posibles:</b> 400 por validacion del DTO; 401 si falla la autenticacion; 404 si no existe una biblioteca compartida enviada a ese usuario; 500 si falla la eliminacion.</p>
</details>

<hr/>

<!-- =========================================
 MONGODB SCHEMAS
========================================= -->

<h2>Schemas MongoDB</h2>

<h3>User</h3>

<table>
  <thead><tr><th>Campo</th><th>Tipo</th><th>Reglas</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td><code>tag</code></td><td>string</td><td>Requerido, unico, min 3, max 25. En DTO debe empezar por <code>@</code> y aceptar letras, numeros y guion bajo.</td><td><code>@usuario</code></td></tr>
    <tr><td><code>name</code></td><td>string</td><td>Requerido, min 2, max 100</td><td><code>Carlos</code></td></tr>
    <tr><td><code>lastname</code></td><td>string</td><td>Requerido, min 2, max 100</td><td><code>Rivero</code></td></tr>
    <tr><td><code>avatar</code></td><td>number</td><td>Requerido, enum 1..12</td><td><code>1</code></td></tr>
    <tr><td><code>email</code></td><td>string</td><td>Requerido, unico, min 10, max 100</td><td><code>emailuser@gmail.com</code></td></tr>
    <tr><td><code>password</code></td><td>string</td><td>Requerido, min 8, max 60, <code>select: false</code>; se guarda cifrado</td><td><code>$2b$10$...</code></td></tr>
    <tr><td><code>genreFav</code></td><td>string</td><td>Opcional, min 2, max 100</td><td><code>Fantasia</code></td></tr>
    <tr><td><code>authorFav</code></td><td>string</td><td>Opcional, min 2, max 100</td><td><code>Brandon Sanderson</code></td></tr>
  </tbody>
</table>

<b>Ejemplo documento:</b>
<pre><code>{
  "_id": "67e54453fae48085b37a28ce",
  "tag": "@usuario",
  "name": "Carlos",
  "lastname": "Rivero",
  "avatar": 1,
  "email": "emailuser@gmail.com",
  "genreFav": "Fantasia",
  "authorFav": "Brandon Sanderson"
}</code></pre>

<h3>Book</h3>

<table>
  <thead><tr><th>Campo</th><th>Tipo</th><th>Reglas</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td><code>isbn</code></td><td>string</td><td>Requerido, unico</td><td><code>978-84-17347-29-1</code></td></tr>
    <tr><td><code>title</code></td><td>string</td><td>Requerido</td><td><code>Nacidos de la bruma 1: El Imperio Final</code></td></tr>
    <tr><td><code>author</code></td><td>string</td><td>Requerido</td><td><code>Brandon Sanderson</code></td></tr>
    <tr><td><code>price</code></td><td>number</td><td>Requerido</td><td><code>12.5</code></td></tr>
    <tr><td><code>epubUrl</code></td><td>string</td><td>Requerido</td><td><code>epubs/978-84-17347-29-1.epub</code></td></tr>
    <tr><td><code>coverUrl</code></td><td>string</td><td>Opcional</td><td><code>covers/eif-bs-m1.jpg</code></td></tr>
    <tr><td><code>genre</code></td><td>string</td><td>Requerido</td><td><code>Fantasia</code></td></tr>
    <tr><td><code>datePublished</code></td><td>Date</td><td>Opcional</td><td><code>2006-07-17T00:00:00.000Z</code></td></tr>
    <tr><td><code>synopsis</code></td><td>string</td><td>Opcional</td><td><code>Durante mil anos han caido cenizas...</code></td></tr>
    <tr><td><code>shareable</code></td><td>boolean</td><td>Requerido</td><td><code>true</code></td></tr>
    <tr><td><code>dateCreation</code></td><td>Date</td><td>Default <code>Date.now</code></td><td><code>2026-06-14T17:55:00.000Z</code></td></tr>
    <tr><td><code>downloads</code></td><td>number</td><td>Default <code>0</code>; se incrementa al anadir a biblioteca</td><td><code>167</code></td></tr>
  </tbody>
</table>

<b>Ejemplo documento:</b>
<pre><code>{
  "_id": "67c74e8be06e6877612e7b35",
  "isbn": "978-84-17347-29-1",
  "title": "Nacidos de la bruma 1: El Imperio Final",
  "author": "Brandon Sanderson",
  "price": 12.5,
  "epubUrl": "epubs/978-84-17347-29-1.epub",
  "coverUrl": "covers/eif-bs-m1.jpg",
  "genre": "Fantasia",
  "datePublished": "2006-07-17T00:00:00.000Z",
  "shareable": true,
  "downloads": 167
}</code></pre>

<h3>Library</h3>

<table>
  <thead><tr><th>Campo</th><th>Tipo</th><th>Reglas</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td><code>idUser</code></td><td>ObjectId ref <code>user</code></td><td>Requerido; propietario de la biblioteca</td><td><code>67e54453fae48085b37a28ce</code></td></tr>
    <tr><td><code>books</code></td><td>ObjectId[] ref <code>book</code></td><td>Lista de libros de la biblioteca</td><td><code>["67c74e8be06e6877612e7b35"]</code></td></tr>
    <tr><td><code>dateCreation</code></td><td>Date</td><td>Default <code>Date.now</code></td><td><code>2026-06-14T17:55:00.000Z</code></td></tr>
  </tbody>
</table>

<b>Ejemplo documento:</b>
<pre><code>{
  "_id": "67f00000fae48085b37a2900",
  "idUser": "67e54453fae48085b37a28ce",
  "books": [
    "67c74e8be06e6877612e7b35",
    "67c74e8be06e6877612e7b36"
  ],
  "dateCreation": "2026-06-14T17:55:00.000Z"
}</code></pre>

<h3>Friendship</h3>

<table>
  <thead><tr><th>Campo</th><th>Tipo</th><th>Reglas</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td><code>idUser1</code></td><td>ObjectId ref <code>user</code></td><td>Requerido; usuario que envia la solicitud</td><td><code>67e54453fae48085b37a28ce</code></td></tr>
    <tr><td><code>idUser2</code></td><td>ObjectId ref <code>user</code></td><td>Requerido; usuario receptor</td><td><code>67e54493fae48085b37a28d1</code></td></tr>
    <tr><td><code>status</code></td><td>string</td><td>Enum <code>pending</code>, <code>accepted</code>, <code>rejected</code>; default <code>pending</code></td><td><code>pending</code></td></tr>
    <tr><td><code>dateCreation</code></td><td>Date</td><td>Default <code>Date.now</code></td><td><code>2026-06-14T17:55:00.000Z</code></td></tr>
  </tbody>
</table>

<b>Ejemplo documento:</b>
<pre><code>{
  "_id": "67f10000fae48085b37a2901",
  "idUser1": "67e54453fae48085b37a28ce",
  "idUser2": "67e54493fae48085b37a28d1",
  "status": "pending",
  "dateCreation": "2026-06-14T17:55:00.000Z"
}</code></pre>

<h3>SharedLibrary</h3>

<table>
  <thead><tr><th>Campo</th><th>Tipo</th><th>Reglas</th><th>Ejemplo</th></tr></thead>
  <tbody>
    <tr><td><code>idUserOwner</code></td><td>ObjectId ref <code>user</code></td><td>Requerido; usuario que comparte</td><td><code>67e54453fae48085b37a28ce</code></td></tr>
    <tr><td><code>idUserFriend</code></td><td>ObjectId ref <code>user</code></td><td>Requerido; usuario que recibe la biblioteca</td><td><code>67e54493fae48085b37a28d1</code></td></tr>
    <tr><td><code>idLibrary</code></td><td>ObjectId ref <code>library</code></td><td>Requerido; biblioteca compartida</td><td><code>67f00000fae48085b37a2900</code></td></tr>
    <tr><td><code>dateAuthorization</code></td><td>Date</td><td>Default <code>Date.now</code></td><td><code>2026-06-14T17:55:00.000Z</code></td></tr>
  </tbody>
</table>

<b>Ejemplo documento:</b>
<pre><code>{
  "_id": "67f20000fae48085b37a2902",
  "idUserOwner": "67e54453fae48085b37a28ce",
  "idUserFriend": "67e54493fae48085b37a28d1",
  "idLibrary": "67f00000fae48085b37a2900",
  "dateAuthorization": "2026-06-14T17:55:00.000Z"
}</code></pre>

<hr/>

<!-- =========================================
 SWAGGER
========================================= -->

<h2>📡 Swagger (OpenAPI)</h2>

<p>Swagger esta configurado en <code>src/main.ts</code>:</p>

<pre><code>
const config = new DocumentBuilder()
  .setTitle('API WeReader')
  .setDescription('Documentacion de la API WeReader')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

SwaggerModule.setup('api/docs', app, document);
</code></pre>

<p>
Acceso: <code>http://localhost:3000/api/docs</code>
</p>

<hr/>

<p align="center">
  <b>WeReader API - Proyecto | 2026</b>
</p>
