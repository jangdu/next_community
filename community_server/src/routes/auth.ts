import { Request, Response, Router } from 'express';
import User from '../entities/User';
import { validate } from 'class-validator';

const mapErrors = (errors: Object[]) => {
  return errors.reduce((acc: any, error: any) => {
    acc[error.property] = Object.values(error.constraints)[0];
    return acc;
  }, {});
};

const register = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  try {
    let errors: any = {};

    const emailUser = await User.findOne({ where: { email } });
    const usernameUser = await User.findOne({ where: { username } });

    if (emailUser) errors.email = '이미 사용중인 이메일입니다.';
    if (usernameUser) errors.username = '이미 사용중인 이름입니다.';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;

    // 엔티티 조건으로 유효성 검사
    errors = await validate(user);

    if (errors.length > 0) return res.status(400).json(mapErrors(errors));

    await user.save();

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

const router = Router();

router.post('/register', register);

export default router;
