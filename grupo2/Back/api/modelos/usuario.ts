import { DataTypes } from 'sequelize';

export let usuario_model = (sequelize: any) => {

    let usuario = sequelize.define('t_usuario', {
        usu_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        usu_email: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        usu_hash: {
            type: DataTypes.TEXT,
        },
        usu_salt: {
            type: DataTypes.TEXT,
        },
        usu_est: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        usu_tipo: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
    }, {
        tableName: 't_usuario',
        timestamps: true
    });

    return usuario;

}