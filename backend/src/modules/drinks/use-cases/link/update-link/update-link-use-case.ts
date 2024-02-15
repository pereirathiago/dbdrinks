import { ILinkRepository } from '@modules/drinks/repositories/i-link-repository'
import { HttpResponse } from '@shared/helpers'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  id: string
  drinkId: string
  link: string
}

@injectable()
class UpdateLinkUseCase {
  constructor(@inject('LinkRepository')
  private linkRepository: ILinkRepository
  ) { }

  async execute({
    id,
    drinkId,
    link,
  }: IRequest): Promise<HttpResponse> {
    const linkC = await this.linkRepository.update({
      id,
      drinkId,
      link,
    })

    return linkC
  }
}

export { UpdateLinkUseCase }

