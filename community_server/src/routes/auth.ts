import bcrypt from 'bcryptjs';
import { Request, Response, Router } from 'express';
import User from '../entities/User';
import { isEmpty, validate } from 'class-validator';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

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

// 로그인 로직
const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    let errors: any = {};

    if (isEmpty(username)) errors.username = '이름을 입력해주세요';
    if (isEmpty(password)) errors.password = '비밀번호를 입력해주세요';

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ username: '등록되지 않은 이름입니다.' });
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return res
        .status(401)
        .json({ password: '비밀번호가 일치하지 않습니다.' });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET);

    // 쿠키저장
    res.set(
      'Set-Cookie',
      cookie.serialize('token', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      }),
    );

    return res.json({ user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

const router = Router();

router.post('/register', register);
router.post('/signin', signin);

export default router;
