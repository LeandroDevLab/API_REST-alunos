import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          // onde irei fazer as validações (o Sequelize utiliza o Validator e todos os seus métodos)
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo nome entre 3 e 255 caracteres',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'Email já existe',
          },
          // onde irei fazer as validações (o Sequelize utiliza o Validator e todos os seus métodos)
          validate: {
            isEmail: {
              msg: 'Email inválido',
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        password: {
          type: Sequelize.VIRTUAL, // campo que não existirá no banco de dados
          defaultValue: '',
          // onde irei fazer as validações (o Sequelize utiliza o Validator e todos os seus métodos)
          validate: {
            len: {
              args: [6, 50],
              msg: 'A senha precisa ter entre 6 e 50 caracteres',
            },
          },
        },
      },
      {
        sequelize,
      }
    );

    // "gancho" | INTERCEPTAÇÃO : entre um pedido e uma execução, beforeSave seria o caminho do passe, executar a ação descrita
    this.addHook('beforeSave', async user => {
      //IF de checagem para se recebeu o user.password fazer a chegagem!
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    return this;
  }
}
