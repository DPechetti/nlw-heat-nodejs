import { Request, Response } from "express";
import { ProfileUserService } from "../services/ProfileUserService";

class ProfileUserController {
  async handle(req: Request, res:Response) {
    const { user_id } = req.body

    const service = new ProfileUserService()

    try {
      const response = await service.execute(user_id)
      
      return res.json(response)
    } catch (error) {
      return res.json(error.message)
    }
  }
}

export { ProfileUserController }