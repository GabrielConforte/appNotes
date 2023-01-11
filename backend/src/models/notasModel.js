
import Sequelize from 'sequelize';

export const notasModel = sequelize => {
  const Notas = sequelize.define('notes', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    archive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    categoriaId: {
        type: Sequelize.INTEGER,
        defaultValue:0,
      },
  });

  sequelize.sync('safe');

  return Notas;
};


