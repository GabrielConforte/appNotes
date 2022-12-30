
import Sequelize from 'sequelize';

import {
    DB_DATABASE,
    DB_HOST,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
  } from "../../config.js";

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
  sequelize.options.logging = false;

export default sequelize;


/* // métodos de CRUD

const create = async (model, data) => {
  try {
    const instance = await model.create(data);
    return instance;
  } catch (error) {
    console.error(error);
  }
};

const findAll = async (model) => {
  try {
    const instances = await model.findAll();
    return instances;
  } catch (error) {
    console.error(error);
  }
};

const findById = async (model, id) => {
  try {
    const instance = await model.findByPk(id);
    return instance;
  } catch (error) {
    console.error(error);
  }
};

const update = async (model, id, data) => {
  try {
    const [updated] = await model.update(data, { where: { id } });
    if (updated) {
      const updatedInstance = await findById(model, id);
      return updatedInstance;
    }
  } catch (error) {
    console.error(error);
  }
};

const deleteOne = async (model, id) => {
  try {
    const deleted = await model.destroy({ where: { id } });
    return deleted;
  } catch (error) {
    console.error(error);
  }
}; */