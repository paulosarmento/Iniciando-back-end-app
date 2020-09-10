import { getRepository } from 'typeorm';
import User from '../models/User';
import { hash, compare } from 'bcryptjs';


interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
}

class AuthenticateUserService {
  public async execute ({ email, password}: Request): Promise<Response>{

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({where: {email}});

    if(!user){
      throw new Error('incorrect email/password combination');
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
      throw new Error('incorrect email/password combination');
    }

    //!Usuario autenticado

    return {
      user,
    };

  }
}

export default AuthenticateUserService;
