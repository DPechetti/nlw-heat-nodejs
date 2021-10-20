import prismaClient from "../prisma"

class ProfileUserService {
  async execute(id: string) {
    const user = await prismaClient.user.findFirst({
      where: { id }
    })

    return user
  }
}

export { ProfileUserService }