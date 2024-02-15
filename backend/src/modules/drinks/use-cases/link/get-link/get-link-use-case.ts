import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { ILinkRepository } from '@modules/drinks/repositories/i-link-repository'

@injectable()
class GetLinkUseCase {
  constructor(
    @inject('LinkRepository')
    private linkRepository: ILinkRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const link = await this.linkRepository.get(id)

    return link
  }
}

export { GetLinkUseCase }
