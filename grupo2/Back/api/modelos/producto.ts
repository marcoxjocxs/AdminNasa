import { DataTypes } from 'sequelize';

export let producto_model = (sequelize: any) => {

  let producto = sequelize.define('t_producto', {
    prod_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    prod_nomb: {
      type: DataTypes.STRING(80),
      allowNull: false
    }
  }, {
    tableName: 't_producto',
    timestamps: true
  });

  return producto;

}