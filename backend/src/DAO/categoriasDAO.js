import { categoriasModel } from '../models/categoriasModel.js';
import sequelize  from '../db/sequelize.js';
const Categorias = categoriasModel(sequelize);

export class categoriasDAO {
    static async createOne(data) {
      try {
        const instance = await Categorias.create(data);
        return instance;
      } catch (error) {
        console.error(error);
      }
    }
  
    static async getAll() {
      try {
        const instances = await Categorias.findAll();
        console.log(instances.map(instance => instance.toJSON()));
        return instances;
      } catch (error) {
        console.error(error);
      }
    }
  
    static async getOne(id) {
      try {
        const instance = await Categorias.findByPk(id);
        return instance;
      } catch (error) {
        console.error(error);
      }
    }
  
    static async updateOne(id, data) {
      try {
        const [updated] = await Categorias.update(data, { where: { id } });
        if (updated) {
          const updatedInstance = await Categorias.findByPk(id)
          return updatedInstance;
        }
      } catch (error) {
        console.error(error);
      }
    }
  
    static async deleteOne(id) {
      try {
        const deleted = await Categorias.destroy({ where: { id } });
        return deleted;
      } catch (error) {
        console.error(error);
      }
    }}