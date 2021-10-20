import { Request, Response } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  async handle(req: Request, res:Response) {
    const { code } = req.body

    const service = new AuthenticateUserService()

    try {
      const response = await service.execute(code)
      
      return res.json(response)
    } catch (error) {
      return res.json(error.message)
    }
  }
}

export { AuthenticateUserController }