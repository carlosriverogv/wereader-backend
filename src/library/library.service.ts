import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLibraryDto } from './dto/create-library.dto';
import { UpdateLibraryDto } from './dto/update-library.dto';
import { Library } from './entities/library.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel('library')
    private readonly libraryModel: Model<Library>,
  ) {}

  /**
   * Crear una biblioteca
   * @param createLibraryDto Los datos de la biblioteca a crear
   * @description Crear una biblioteca
   * @returns {Promise<{ ok: boolean; resultado: Library }>} La biblioteca creada
   * @throws InternalServerErrorException Si ocurre un error inesperado
   */
  async create(
    createLibraryDto: CreateLibraryDto,
  ): Promise<{ ok: boolean; resultado: Library }> {
    try {
      // Verificar si ya existe una biblioteca para el usuario
      const existingLibrary = await this.libraryModel.findOne({
        idUser: createLibraryDto.idUser,
      });

      // Si ya existe una biblioteca para el usuario, lanzar un error
      if (existingLibrary) {
        throw new InternalServerErrorException(
          'Ya existe una biblioteca para este usuario',
        );
      }

      // Crear la biblioteca
      const library = new this.libraryModel(createLibraryDto);
      await library.save();

      // Devolver la biblioteca creada
      return { ok: true, resultado: library };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error inesperado creando la biblioteca: ' + error,
      );
    }
  }

  // Buscar la biblioteca de un usuario
  async findByOwnerId(idUser: string): Promise<Library> {
    const library = await this.libraryModel
      .findOne({ idUser })
      .populate('books') // Obtener la lista de libros
      //.populate('idUser') // Obtener los datos del usuario
      .exec();

    if (!library) {
      throw new InternalServerErrorException(
        'No se encontró la biblioteca del usuario',
      );
    }

    return library;
  }

  findAll() {
    return `This action returns all library`;
  }

  findOne(id: number) {
    return `This action returns a #${id} library`;
  }

  update(id: number, updateLibraryDto: UpdateLibraryDto) {
    return `This action updates a #${id} library`;
  }

  remove(id: number) {
    return `This action removes a #${id} library`;
  }
}
