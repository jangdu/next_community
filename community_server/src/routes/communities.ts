import { isEmpty } from 'class-validator';
import { Request, Response, Router } from 'express';
import { AppDataSource } from '../data-source';
import Community from '../entities/Community';
import User from '../entities/User';

import userMiddleware from '../middlewares/user';
import authMiddleware from '../middlewares/auth';

const createCommunity = async (req: Request, res: Response) => {
  const { name, title, description } = req.body;

  try {
    let errors: any = {};

    if (isEmpty(name)) {
      errors.name = '커뮤니티의 이름을 입력해주세요';
    }
    if (isEmpty(title)) {
      errors.title = '커뮤니티의 제목을 입력해주세요';
    }

    const community = await AppDataSource.getRepository(Community)
      .createQueryBuilder('sub')
      .where('lower(sub.name) = :name', { name: name.toLowerCase() })
      .getOne();

    if (community) {
      errors.name = '이미 존재하는 커뮤니티 이름입니다.';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }

  try {
    const user: User = res.locals.user;

    const community = new Community();

    community.name = name;
    community.description = description;
    community.title = title;
    community.user = user;

    await community.save();

    return res.json(community);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const router = Router();

router.post('/', userMiddleware, authMiddleware, createCommunity);

export default router;
