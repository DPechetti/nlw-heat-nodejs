import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";

class CreateMessageController {
  async handle(req: Request, res: Response) {
    const { user_id, body: { message } } = req

    const service = new CreateMessageService()

    const response = await service.execute(message, user_id)

    return res.json(response)
  }
}

export { CreateMessageController }