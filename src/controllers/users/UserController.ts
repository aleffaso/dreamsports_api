import { Request, Response } from "express";

import { ListUsersService } from "../../service/users/ListUsersService";
import { GetUserService } from "../../service/users/GetUserService";
import { CreateUserService } from "../../service/users/CreateUserService";
import { UpdateUserService } from "../../service/users/UpdateUserService";
import { DeleteUserService } from "../../service/users/DeleteUserService";
import { AuthenticateUserService } from "../../service/users/AuthenticateUserService";

export default new (class UserController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const authenticateUserService = new AuthenticateUserService();

      const authenticate = await authenticateUserService.execute({
        email,
        password,
      });

      return res.json(authenticate);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async create(req: Request, res: Response) {
    const { name, email, admin, is_active, password } = req.body;
    try {
      const createUserService = new CreateUserService();

      const userRequest = await createUserService.execute({
        name,
        email,
        admin,
        password,
        is_active,
      });

      return res.json(userRequest);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const listUsersService = new ListUsersService();

      const users = await listUsersService.execute();

      return res.json(users);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const getUserService = new GetUserService();

      const user = await getUserService.execute({ id });

      return res.json(user);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, admin, is_active, password } = req.body;
    try {
      const updateUserService = new UpdateUserService();

      const userRequest = await updateUserService.execute({
        id,
        name,
        email,
        admin,
        is_active,
        password,
      });

      return res.json(userRequest);
    } catch (error) {
      res.json({ error: error });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const deleteUserService = new DeleteUserService();

      await deleteUserService.execute({
        id,
      });

      return res.status(200).json({
        message: "Deleted successfully",
      });
    } catch (error) {
      res.json({ error: error });
    }
  }
})();
