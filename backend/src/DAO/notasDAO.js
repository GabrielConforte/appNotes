
import { notasModel } from '../models/notasModel.js';
import sequelize  from '../db/sequelize.js';
const Notas = notasModel(sequelize);

export class notasDAO {
  static async createOne(data) {
    try {
      const instance = await Notas.create(data);
      return instance;
    } catch (error) {
      console.error(error);
    }
  }

  static async getAll() {
    try {
      const instances = await Notas.findAll({ where: { archive: false } });
      console.log(instances.map(instance => instance.toJSON()));
      return instances;
    } catch (error) {
      console.error(error);
    }
  }

  static async getOne(id) {
    try {
      const instance = await Notas.findByPk(id);
      return instance;
    } catch (error) {
      console.error(error);
    }
  }

  static async updateOne(id, data) {
    try {
      const [updated] = await Notas.update(data, { where: { id } });
      if (updated) {
        const updatedInstance = await Notas.findByPk(id)
        return updatedInstance;
      }
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteOne(id) {
    try {
      const deleted = await Notas.destroy({ where: { id } });
      return deleted;
    } catch (error) {
      console.error(error);
    }
  }

  static async toggleArchive(id, archive) {
    try {
      const [updated] = await Notas.update({ archive }, { where: { id } });
      if (updated) {
        const updatedInstance = await Notas.findByPk(id);
        return updatedInstance.toJSON();
      }
    } catch (error) {
      console.error(error);
    }
  }

  static async getArchived() {
    try {
      const instances = await Notas.findAll({ where: { archive: true } });
      return instances.map(instance => instance.toJSON());
    } catch (error) {
      console.error(error);
    }
  }

  static async getFilter(id) {
    try {
      const instances = await Notas.findAll({
        where: {categoriaId: id},
      });
      console.log(instances.map(instance => instance.toJSON()));
      return instances;
    } catch (error) {
      console.error(error);
    }
  }


}
