import axios from "axios"
import { sign } from "jsonwebtoken"
import prismaClient from "../prisma"

interface IAccessTokenResponse {
  access_token: string
}

interface IUserResponse {
  avatar_url: string,
  login: string,
  id: number,
  name: string
}

class AuthenticateUserService {
  async execute(code: String) {
    const url = 'https://github.com/login/oauth/access_token'

    const { data: accessTokenData } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      headers: {
        'Accept': 'application/json'
      }
    })

    const response = await axios.get<IUserResponse>('https://api.github.com/user', {
      headers: {
        authorization: `Bearer ${accessTokenData.access_token}`
      }
    })

    const { data: { login, id: github_id, avatar_url, name } } = response

    let user = await prismaClient.user.findFirst({
      where: { github_id }
    })

    if (!user) 
      user = await prismaClient.user.create({
        data: {
          github_id,
          login,
          avatar_url,
          name
        }
      }) 

    const token = sign({
      user: {
        name: user.name,
        avatar_url: user.avatar_url,
        id: user.id
      }
    },
    process.env.JWT_SECRET,
    {
      subject: user.id,
      expiresIn: '1d'
    })

    return { token, user }
  }
}

export { AuthenticateUserService }