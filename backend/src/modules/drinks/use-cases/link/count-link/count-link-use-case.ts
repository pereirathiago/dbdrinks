import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { ILinkRepository } from '@modules/drinks/repositories/i-link-repository'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountLinkUseCase {
  constructor(
    @inject('LinkRepository')
    private linkRepository: ILinkRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const linkCount = await this.linkRepository.count(
      search,
      filter
    )

    return linkCount
  }
}

export { CountLinkUseCase }
