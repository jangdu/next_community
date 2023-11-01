import { Request, Response, Router } from 'express';
import userMiddleware from '../middlewares/user';
import authMiddleware from '../middlewares/auth';
import Community from '../entities/Community';
import Post from '../entities/Post';

const createPost = async (req: Request, res: Response) => {
  const { title, body, community } = req.body;

  if (title.trim() === '') {
    return res.status(400).json({ title: '제목을 비워 둘 수 없습니다.' });
  }

  const user = res.locals.user;

  try {
    const communityRecord = await Community.findOneOrFail({
      where: { name: community },
    });

    const post = new Post();

    post.title = title;
    post.body = body;
    post.user = user;
    post.community = communityRecord;

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: '문제가 발생했습니다.' });
  }
};

const router = Router();

router.post('/', userMiddleware, authMiddleware, createPost);

export default router;
