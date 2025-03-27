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
    price: 19.5,
    epubUrl: 'https://example.com/books/arte-de-programar.epub',
    coverUrl: 'https://example.com/covers/arte-de-programar.jpg',
    gender: 'Fantasía',
    datePublished: new Date('2006-07-17T00:00:00.000Z'),
    synopsis:
      'Durante mil años han caído cenizas del cielo. Durante mil años nada ha florecido. Durante mil años los skaa han sido esclavizados y viven en la miseria, sumidos en un miedo inevitable. Durante mil años el Lord Legislador ha reinado con poder absoluto, dominando gracias al terror, a sus poderes y a su inmortalidad, ayudado por «obligadores» e «inquisidores», junto a la poderosa magia de la alomancia. Pero los nobles a menudo han tenido trato sexual con jóvenes skaa y, aunque la ley lo prohíbe, algunos de sus bastardos han sobrevivido y heredado los poderes alománticos: son los «nacidos de la bruma» (mistborn). Ahora, Kelsier, el «superviviente», el único que ha logrado huir de los Pozos de Hathsin, ha encontrado a Vin, una pobre chica skaa con mucha suerte... Tal vez los dos, con el mejor equipo criminal jamás reunido, unidos a la rebelión que los skaa intentan desde hace mil años, logren cambiar el mundo y acabar con la atroz mano de hierro del Lord Legislador.',
    shareable: true,
    dateCreation: new Date(),
  },
  {
    isbn: '978-84-666-5890-4',
    title: 'Nacidos de la bruma 2: El Pozo de la Ascensión',
    author: 'Brandon Sanderson',
    price: 19.5,
    epubUrl: 'https://example.com/books/arte-de-programar.epub',
    coverUrl: 'https://example.com/covers/arte-de-programar.jpg',
    gender: 'Fantasía',
    datePublished: new Date('2007-08-21T00:00:00.000Z'),
    synopsis:
      "Durante mil años han caído las cenizas y nada florece. Durante mil años los skaa han sido esclavizados y viven sumidos en un miedo inevitable. Durante mil años el Lord Legislador reina con un poder absoluto gracias al terror, a sus poderes y a su inmortalidad. Pero vencer y matar al Lord Legislador fue la parte sencilla. El verdadero desafío será sobrevivir a las consecuencias de su caída. Tomar el poder tal vez resultó fácil, pero ¿qué ocurre después?, ¿cómo se utiliza? En ese mundo de aventura épica, la estrategia política y religiosa debe lidiar con los siempre misteriosos poderes de la alomancia... La magia es central en Scadrial. La disciplina de magia más ampliamente conocida es llamada alomancia, la cual permite a sus usuarios a ganar habilidades sobrenaturales al tragar y 'quemar' metales específicos. El potencial alomántico es una carga genética que se encuentra principalmente concentrada en la nobleza, sin embargo, también existen skaa alománticos, dado al cruce entre la nobleza y los skaa. Los alománticos comunes tienen acceso a un solo poder alomántico, pero una increíblemente pequeña fracción de alománticos, llamados Nacidos de la bruma, tienen acceso a todos los poderes alománticos.",
    shareable: true,
    dateCreation: new Date(),
  },
  {
    isbn: '978-84-675-4323-5',
    title: 'La historia interminable',
    author: 'Michael Ende',
    price: 18.5,
    epubUrl: 'https://example.com/books/la-historia-interminable.epub',
    coverUrl: 'https://example.com/covers/la-historia-interminable.jpg',
    gender: 'Fantasía',
    datePublished: new Date('1979-09-01T00:00:00.000Z'),
    synopsis:
      'Un libro mágico que transporta a Bastian a un mundo de fantasía...',
    shareable: true,
    dateCreation: new Date(),
  },
  {
    isbn: '978-84-450-7762-6',
    title: 'Veinte mil leguas de viaje submarino',
    author: 'Julio Verne',
    price: 15.99,
    epubUrl: 'https://example.com/books/veinte-mil-leguas.epub',
    coverUrl: 'https://example.com/covers/veinte-mil-leguas.jpg',
    gender: 'Fantasía',
    datePublished: new Date('1870-01-01T00:00:00.000Z'),
    synopsis: 'Una expedición en el Nautilus con el enigmático Capitán Nemo...',
    shareable: true,
    dateCreation: new Date(),
  },
  // Puedes agregar más libros aquí...
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
