import mongoose from 'mongoose';
import { UserSchema } from '../user/entities/user.entity';

// 📌 Conexión a MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/wereader';

mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error de conexión:', err));

// 📌 Definir el modelo
const UserModel = mongoose.model('User', UserSchema);

// 📚 Lista de usuarios a insertar
const users = [
  // {
  //   tag: '@carlosrgv23',
  //   name: 'Carlos',
  //   lastname: 'Rivero',
  //   avatar: 2,
  //   email: 'karlos.riverog@gmail.com',
  //   password: 'MyPassword23&',
  //   genderFav: 'Fantasía',
  //   authorFav: 'Brandon Sanderson',
  // },
  // {
  //   tag: '@noelsorianoo',
  //   name: 'Noel',
  //   lastname: 'Soriano',
  //   avatar: 2,
  //   email: 'noelsorianosaez@gmail.com',
  //   password: 'MyPassword23&',
  //   genderFav: 'Thriller',
  //   authorFav: 'Paul Pen',
  // },
  // Puedes agregar más libros aquí...
];

// 📌 Función para poblar la base de datos
const seedDatabase = async () => {
  try {
    console.log('🗑️ Eliminando usuarios existentes...');
    await UserModel.deleteMany(); // Limpiar colección
    await UserModel.insertMany(users); // Insertar datos
    console.log('🎉 Usuarios insertados correctamente.');
    await mongoose.connection.close(); // Cierra la conexión
  } catch (error) {
    console.error('❌ Error insertando usuarios:', error);
  }
};

// Ejecutar script
seedDatabase();
