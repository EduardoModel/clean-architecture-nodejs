'use strict'

import {
  Model,
  Optional
} from 'sequelize'

import UserAttributes from './../../domain/entities/interfaces/IUser'

type UserCreationAttributes = Optional<UserAttributes, 'id'>

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number
    public email!: string
    public password!: string | undefined

    static associate (models: any) {
      // this.hasOne(models.Profile, {
      //   foreignKey: 'user_id',
      //   as: 'profile'
      // })

      // this.hasMany(models.RefreshToken, {
      //   foreignKey: 'user_id',
      //   as: 'refreshTokens'
      // })
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(256),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      // beforeSave: async (user) => {
      //   if (user.password) {
      //     // Pass the password to be hashed and the strength of the hash
      //     user.passwordHash = await bcrypt.hash(user.password, 8)
      //   }
      // }
    }
  })

  return User
}
