import mongoose from 'mongoose';
import { BookSchema } from '../book/entities/book.entity';

// 📌 Conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/wereader';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error de conexión:', err));

// 📌 Definir el modelo
const BookModel = mongoose.model('Book', BookSchema);

// 📚 Lista de libros a insertar
const books = [
  {
    isbn: '978-84-17347-29-1',
    title: 'Nacidos de la bruma 1: El Imperio Final',
    author: 'Brandon Sanderson',
    price: 12.5,
    epubUrl: 'epubs/978-84-17347-29-1.epub',
    coverUrl: 'covers/eif-bs-m1.jpg',
    genre: 'Fantasía',
    datePublished: new Date('2006-07-17T00:00:00.000Z'),
    synopsis:
      'Durante mil años han caído cenizas del cielo.\n\nDurante mil años nada ha florecido.\n\nDurante mil años los skaa han sido esclavizados y viven en la miseria, sumidos en un miedo inevitable.\n\nDurante mil años el Lord Legislador ha reinado con poder absoluto, dominando gracias al terror, a sus poderes y a su inmortalidad, ayudado por «obligadores» e «inquisidores», junto a la poderosa magia de la alomancia. Pero los nobles a menudo han tenido trato sexual con jóvenes skaa y, aunque la ley lo prohíbe, algunos de sus bastardos han sobrevivido y heredado los poderes alománticos: son los «nacidos de la bruma» (mistborn). Ahora, Kelsier, el «superviviente», el único que ha logrado huir de los Pozos de Hathsin, ha encontrado a Vin, una pobre chica skaa con mucha suerte... Tal vez los dos, con el mejor equipo criminal jamás reunido, unidos a la rebelión que los skaa intentan desde hace mil años, logren cambiar el mundo y acabar con la atroz mano de hierro del Lord Legislador.',
    shareable: true,
    downloads: 167,
    dateCreation: new Date(),
  },
  {
    isbn: '978-84-666-5890-4',
    title: 'Nacidos de la bruma 2: El Pozo de la Ascensión',
    author: 'Brandon Sanderson',
    price: 12.5,
    epubUrl: 'epubs/978-84-666-5890-4.epub',
    coverUrl: 'covers/epdla-bs-m2.jpg',
    genre: 'Fantasía',
    datePublished: new Date('2007-08-21T00:00:00.000Z'),
    synopsis:
      'Durante mil años han caído las cenizas y nada florece.\n\nDurante mil años los skaa han sido esclavizados y viven sumidos en un miedo inevitable.\n\nDurante mil años el Lord Legislador reina con un poder absoluto gracias al terror, a sus poderes y a su inmortalidad. Pero vencer y matar al Lord Legislador fue la parte sencilla. El verdadero desafío será sobrevivir a las consecuencias de su caída. Tomar el poder tal vez resultó fácil, pero ¿qué ocurre después?, ¿cómo se utiliza? En ese mundo de aventura épica, la estrategia política y religiosa debe lidiar con los siempre misteriosos poderes de la alomancia...\n\nLa magia es central en Scadrial. La disciplina de magia más ampliamente conocida es llamada alomancia, la cual permite a sus usuarios a ganar habilidades sobrenaturales al tragar y quemar metales específicos. El potencial alomántico es una carga genética que se encuentra principalmente concentrada en la nobleza, sin embargo, también existen skaa alománticos, dado al cruce entre la nobleza y los skaa. Los alománticos comunes tienen acceso a un solo poder alomántico, pero una increíblemente pequeña fracción de alománticos, llamados Nacidos de la bruma, tienen acceso a todos los poderes alománticos.',
    shareable: true,
    downloads: 110,
    dateCreation: new Date(),
  },
  {
    isbn: '978-8413143743',
    title: 'El heroe de las eras. Nacidos de la bruma 3',
    author: 'Brandon Sanderson',
    price: 11.95,
    epubUrl: 'epubs/978-8413143743.epub',
    coverUrl: 'covers/ehdle-bs-m3.jpg',
    genre: 'Fantasía',
    datePublished: new Date('2008-10-14T00:00:00Z'),
    synopsis:
      'Durante mil años los skaa han vivido esclavizados y sumidos en el miedo al Lord Legislador, que ha reinado con un poder absoluto gracias al terror y a la poderosa magia de la alomancia. Kelsier, el Superviviente, el único que ha logrado huir de los Pozos de Hathsin, encuentra a Vin, una pobre chica skaa con mucha suerte. Los dos se unen a la rebelión que los skaa intentan desde hace un milenio y vencen al Lord Legislador. Pero acabar con el Lord Legislador es la parte sencilla. El verdadero desafío consistirá en sobrevivir a las consecuencias de su caída. En El Héroe de las Eras se comprende el porqué de la niebla y las cenizas, las tenebrosas acciones del Lord Legislador y la naturaleza del Pozo de la Ascensión. Vin y el Rey Elend buscan en los últimos escondites de recursos del Lord Legislador y descubren el peligro que acecha a la humanidad. ¿Conseguirán detenerlo a tiempo?',
    shareable: true,
    downloads: 45,
    dateCreation: new Date(),
  },
  {
    isbn: '9788490192214',
    title: 'Aleación de ley. Nacidos de la Bruma 4',
    author: 'Brandon Sanderson',
    price: 11.95,
    epubUrl: 'epubs/9788490192214.epub',
    coverUrl: 'covers/adl-bs-m4.jpg',
    genre: 'Fantasía',
    datePublished: new Date('2012-09-18T00:00:00Z'),
    synopsis:
      'Han pasado ya trescientos años desde los acontecimientos narrados en la primera trilogía de la saga y Scadrial se encuentra ahora cerca de la modernidad: ferrocarriles, canales, iluminación eléctrica y los primeros rascacielos invaden el planeta. Aunque la ciencia y la tecnología están alcanzando nuevos retos, la antigua magia de la alomancia continúa desempeñando un papel fundamental. En una zona conocida como los Áridos existen herramientas cruciales para aquellos hombres y mujeres que intentan establecer el orden y la justicia. Uno de estos hombres es Lord Waxillium Ladrian, experto en metales y en el uso de la alomancia y la feruquimia. Después de vivir veinte años en los Áridos, Wax se ha visto obligado, por una tragedia familiar, a volver a la metrópolis de Elendel. Sin embargo, y a su pesar, deberá guardar las armas y asumir las obligaciones que exige el hecho de estar rodeado de la clase noble. O al menos eso cree, ya que aún no sabe que las mansiones y las elegantes calles arboladas de la ciudad pueden ser incluso más peligrosas que las llanuras de los Áridos. Un skyline metálico de bruma, de ceniza y vapor conquista el cielo amenazando a todos aquellos que viven y luchan debajo de él.',
    shareable: true,
    downloads: 35,
    dateCreation: new Date(),
  },
  {
    isbn: '978-8419507907',
    title: 'La historia interminable',
    author: 'Michael Ende',
    price: 7.59,
    epubUrl: 'epubs/',
    coverUrl: 'covers/lhi-me.jpg',
    genre: 'Fantasía',
    datePublished: new Date('1983-09-01T00:00:00Z'),
    synopsis:
      'La Emperatriz Infantil está mortalmente enferma y su reino, Fantasia, corre un grave peligro. La salvación depende de Atreyu, un valiente guerrero de la tribu de los pieles verdes, y Bastian, un niño tímido que lee con pasión un libro mágico. Solo un ser humano puede salvar este lugar encantado. Juntos emprenderán un fascinante viaje a través de tierras de dragones, gigantes, monstruos y magia que no tiene vuelta atrás. A medida que se adentra en Fantasia, Bastian deberá resolver también los misterios de su propio corazón.',
    shareable: true,
    downloads: 24,
    dateCreation: new Date(),
  },
  {
    isbn: '978-8447326327',
    title: 'Viaje al centro de la tierra',
    author: 'Jules Verne',
    price: 10.95,
    epubUrl: 'epubs/vacdlt.epub',
    coverUrl: 'covers/ic_book_placeholder.png',
    genre: 'Ciencia ficción',
    datePublished: new Date('1964-11-25T00:00:00Z'),
    synopsis:
      'La historia trata sobre un profesor de geología que descubre un manuscrito que le revela el camino hacia el centro de la Tierra',
    shareable: true,
    downloads: 3,
    dateCreation: new Date(),
  },
  {
    isbn: '9788419942319',
    title: 'La península de las casas vacias',
    author: 'David Uclés',
    price: 14.95,
    epubUrl: 'epubs/9788419942319.epub',
    coverUrl: 'covers/lpdlcv.jpg',
    genre: 'Ficción',
    datePublished: new Date('2024-03-20T00:00:00Z'),
    synopsis:
      'He aquí la historia de la descomposición total de una familia, de la deshumanización de un pueblo, de la desintegración de un territorio y de una península de casas vacías.\n\nLa historia de un soldado que se raja la piel para dejar salir la ceniza acumulada, de un poeta que cose la sombra de una niña tras un bombardeo, y de un maestro que enseña a sus alumnos a hacerse los muertos; de un general que duerme junto a la mano cortada de una santa, de un niño ciego que recupera la vista durante un apagón, y de una campesina que pinta de negro todos los árboles de su huerto; de un fotógrafo extranjero que pisa una mina cerca de Brunete y no levanta el pie en cuarenta años, de un gernikarra que conduce hasta el centro de París una camioneta con los restos humeantes de un ataque aéreo, y de un perro herido cuya sangre teñirá la última franja de una bandera abandonada en Badajoz.\n\nHe aquí pues la historia total de la Guerra Civil española y de una Iberia agonizante donde lo fantástico apuntala la crudeza de lo real; donde los anónimos miembros de un extenso clan de olivareros de Jándula cruzan sus destinos con los de Alberti, Lorca y Unamuno; Rodoreda, Zambrano y Kent; Hemingway, Orwell y Bernanos; Picasso y Mallo; Azaña y Foxá; donde lo épico y lo costumbrista se entrelazan para tejer un portentoso tapiz, poético y grotesco, bello y delirante.',
    shareable: false,
    downloads: 89,
    dateCreation: new Date(),
  },
  {
    isbn: '978-8410299641',
    title: 'La isla de la Mujer Dormida',
    author: 'Arturo Pérez-Reverte',
    price: 12.34,
    epubUrl: 'epubs/',
    coverUrl: 'covers/lidlmd-apr.jpg',
    genre: 'Ficción militar histórica',
    datePublished: new Date('2024-10-08T00:00:00Z'),
    synopsis:
      'Abril de 1937.\n\nMientras en España transcurre la guerra civil, el marino mercante Miguel Jordán Kyriazis es enviado por el bando sublevado para atacar de modo clandestino el tráfico naval que desde la Unión Soviética transporta ayuda militar para la República. En la base de operaciones, una pequeña isla del mar Egeo, la vida del corsario español se cruzará en turbio triángulo con la de los propietarios, el barón Katelios y su esposa: una seductora mujer madura que busca, con fría desesperación, el modo de escapar a su destino.',
    shareable: false,
    downloads: 150,
    dateCreation: new Date(),
  },
  {
    isbn: '978-8466374637',
    title: 'El cuco de cristal',
    author: 'Javier Castillo',
    price: 9.49,
    epubUrl: 'epubs/',
    coverUrl: 'covers/ecdc-jc.jpg',
    genre: 'Thriller',
    datePublished: new Date('2023-02-01T00:00:00Z'),
    synopsis:
      'Un trasplante de urgencia. Un donante lleno de secretos. ¿Qué esconden los latidos de tu corazón?. Nueva York, 2017. Cora Merlo, médico residente de primer año, sufre un infarto fulminante que la obliga a un trasplante de corazón. Aún convaleciente la joven recibe la visita de una extraña mujer con una enigmática oferta: pasar unos días en Steelville, un pequeño pueblo de interior, para conocer la vida de su hijo Charles, el donante de su corazón. Cora se adentra así en un hogar lleno de secretos, en un misterio que se extiende durante veinte años y en un pueblo hermético en el que, justo el día de su llegada, desaparece un bebé en un parque público.',
    shareable: true,
    downloads: 127,
    dateCreation: new Date(),
  },
  {
    isbn: '978-8410080577',
    title: 'No mientas',
    author: 'Arturo del Burgo',
    price: 5.99,
    epubUrl: 'epubs/',
    coverUrl: 'covers/nm-adb.jpg',
    genre: 'Thriller',
    datePublished: new Date('2024-12-19T00:00:00Z'),
    synopsis:
      'El cuerpo de Daniela aparece sin vida en un hotel a las afueras de San Sebastián. Esperaba a su amante en la habitación cuando la sorprendió una muerte brutal y violenta: esposada con los ojos vendados para simular un inocente juego sexual, y apuñalada. La inspectora Adriana Collante acude a la escena del crimen para hacerse cargo de la investigación. Pero también lo hace un periodista que ha recibido un correo del asesino con la hora y la fecha del lugar del homicidio. Así se anuncia la muerte de la mujer, la primera víctima que ha caído en las garras de este sociópata. Lo que a simple vistaparecía un crimen pasional, una venganza, se convierte enseguida en el primero de una macabra serie de homicidios narrados y publicados en una página web minutos antes de que ocurran. Arranca entonces una carrera trepidante y contrarreloj por atrapar al asesino antes de que obtenga el éxito y la fama que persigue con cada muerte anunciada.',
    shareable: true,
    downloads: 325,
    dateCreation: new Date(),
  },
  {
    isbn: '978-8416588572',
    title: 'Invisible',
    author: 'Eloy Moreno',
    price: 7.54,
    epubUrl: 'epubs/978-8416588572.epub',
    coverUrl: 'covers/invisible-em.jpg',
    genre: 'Ficción',
    datePublished: new Date('2018-02-01T00:00:00Z'),
    synopsis:
      '¿Quién no ha deseado alguna vez ser invisible?.\n\n¿Quién no ha deseado alguna vez dejar de serlo?.\n\nEl problema es que nunca he llegado a controlar bien ese poder: A veces, cuando más ganas tenía de ser invisible, era cuando más gente me veía, y en cambio, cuando deseaba que todos me vieran, era cuando a mi cuerpo le daba por desaparecer.',
    shareable: true,
    downloads: 231,
    dateCreation: new Date(),
  },
  {
    isbn: '978-8418050862',
    title: 'Redes (Invisible 2)',
    author: 'Eloy Moreno',
    price: 7.54,
    epubUrl: 'epubs/redes-em.epub',
    coverUrl: 'covers/redes-em.jpg',
    genre: 'Ficción',
    datePublished: new Date('2024-09-19T00:00:00Z'),
    synopsis:
      '¿Cuántos likes vale tu felicidad?. Se pasa unas horas más viendo los viajes maravillosos, los cuerpos perfectos y todos los outfits que se prueban cada día los influencers. Y se siente mal porque ella no puede llevar la vida que ve en las redes, sabe que nunca podrá alcanzar una felicidad así.',
    shareable: true,
    downloads: 111,
    dateCreation: new Date(),
  },
  {
    isbn: '978-8401341991',
    title: 'El brillo de las luciérnagas',
    author: 'Paul Pen',
    price: 7.49,
    epubUrl: 'epubs/',
    coverUrl: 'covers/ebdll-pp.jpg',
    genre: 'Thriller',
    datePublished: new Date('2013-05-09T00:00:00Z'),
    synopsis:
      'Tengo diez años y llevo toda mi vida en este sótano. Vivo en la oscuridad con mis padres, mi abuela, mi hermana y mi hermano. Todos están desfigurados por el fuego. Mi hermana lleva una máscara blanca para tapar sus quemaduras porque papá dice que su cara podría asustarme. Me gusta mi cactus. Me gusta leer mi libro sobre insectos. Y tocar durante horas el único rayo de sol que se filtra por una rendija del techo. Pero, desde que mi hermana tuvo al bebé, todos actúan de forma extraña. Creo que mienten sobre quién es el padre, sobre el hombre grillo que acecha por las noches, sobre lo que sucedió antes de que yo naciera, sobre por qué estamos aquí encerrados. Por lo menos tengo a las luciérnagas. Llegaron hace unos días al sótano y las he guardado en un bote. Como dice mi abuela, no existe criatura más fascinante que aquella que es capaz de crear luz por sí misma. Esa luz me anima a conocer el mundo exterior, a escapar, a descubrir qué sucedió. Lo malo es que aquí todas las puertas están cerradas. Y no sé dónde voy a encontrar una salida...',
    shareable: true,
    downloads: 98,
    dateCreation: new Date(),
  },
  {
    isbn: '978-8433928931',
    title: 'Abel',
    author: 'Alessandro Baricco',
    price: 11.95,
    epubUrl: 'epubs/978-8433928931.epub',
    coverUrl: 'covers/abel-ab.jpg',
    genre: 'Western',
    datePublished: new Date('2024-10-09T00:00:00Z'),
    synopsis:
      'El sheriff Abel Crow tiene 27 años y ya es un personaje de leyenda. Sus dotes innatas como tirador —su disparo preferido es «el Místico», uno doble, cruzado y simultáneo, con ambas manos, sobre blancos distintos—, no podrán evitar, sin embargo, que en un momento crítico se replantee el sentido de la existencia.\n\nLas relaciones, entre otros, con su novia, que entra y sale libremente de su vida, pero que lo conoce incluso mejor que él mismo; con sus hermanos (un predicador, un rico minero, un cartero demente y una visionaria, empeñada en reunirlos a todos para rescatar del patíbulo a su madre, que los abandonó cuando eran niños); con las curanderas y una bruja indias, portadoras de la sabiduría ancestral de los nativos; y con su Maestro, quien siendo adolescente logró aniquilar a casi toda la tripulación de un barco pirata, constituyen parte de un viaje espiritual que culmina con la percepción de que no existe (o no funciona como pensamos) la relación causa-efecto, de que no hay un antes y un después claramente definibles. Buena prueba de ello es también la estructura no lineal del relato, que avanza, retrocede y se repite, y donde cada uno de los veintisiete capítulos (o cantos) constituye una pieza de un puzle que al final nos devolverá la imagen caleidoscópica de Abel Crow durante su aprendizaje.\n\nBaricco nos presenta así un western que pone en cuestión una de las piedras angulares del género, la noción de frontera, desplazándola aquí del exterior al interior: es límite y confín entre lo visible y lo invisible, entre lo físico y lo metafísico, entre la vida y la muerte. Si los espacios son los propios del género, como en una película de Sergio Leone (las praderas interminables, el pueblo, con su banco y su saloon, las aldeas indias, el río de aguas bravas, el desierto abrasador…), no dejan de ser también reverberaciones de una unidad profunda del universo, del mismo modo que todos y cada uno de nosotros somos parte de un único aliento.',
    shareable: true,
    downloads: 36,
    dateCreation: new Date(),
  },
];

// 📌 Función para poblar la base de datos
const seedDatabase = async () => {
  try {
    console.log('🗑️ Eliminando libros existentes...');
    await BookModel.deleteMany(); // Limpiar colección
    await BookModel.insertMany(books); // Insertar datos
    console.log('🎉 Libros insertados correctamente.');
    await mongoose.connection.close(); // Cierra la conexión
  } catch (error) {
    console.error('❌ Error insertando libros:', error);
  }
};

// Ejecutar script
seedDatabase();
