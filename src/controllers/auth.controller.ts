import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/user.service.js';
import { exceptionController } from './exception.controller.js';

declare module 'express-session' {
  interface SessionData {
    user?: { id: string };
  }
}

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { login, password } = req.body;

      if (!login || !password) {
        res.status(400).json({ message: 'Bad request' });
        return;
      }

      const user = await userService.getOneByLogin({ login });

      if (!user) {
        res.status(404).json({
          message: 'User not found',
        });
        return;
      }

      const validPassword = user.password === password;

      if (!validPassword) {
        res.status(401).json({
          message: 'Invalid password',
        });
        return;
      }

      req.session.user = { id: user._id.toString() };

      res.status(200).json({
        message: 'Login successful',
      });
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }

  validate(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.session.user) {
        next();
      } else {
        res.status(403).json({
          message: 'Forbidden',
        });
      }
    } catch (error) {
      exceptionController.httpException(res, error);
    }
  }

  logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) {
        exceptionController.httpException(res, err);
        return;
      }
    });

    res.clearCookie('rss').status(200).json({
      message: 'Logout successful',
    });
  }
}

const authController = new AuthController();
export { authController };
