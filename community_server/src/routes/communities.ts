import { Request, Response, Router } from 'express';

const createCommunity = async (req: Request, res: Response) => {
  const { name, title, description } = req.body;
};

const router = Router();

router.post('/', createCommunity);

export default router;
