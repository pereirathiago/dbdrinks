import { ILinkRepository } from "@modules/drinks/repositories/i-link-repository"
import { inject, injectable } from "tsyringe"

interface IRequest {
  drinkId: string
  link: string
}

@injectable()
class CreateLinkUseCase {
  constructor(
    @inject('LinkRepository')
    private linkRepository: ILinkRepository
  ) { }

  async execute({
    drinkId,
    link
  }: IRequest) {
    const result = await this.linkRepository.create({
      drinkId,
      link
    })

    return result
  }
}

export { CreateLinkUseCase }