import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers';
import { ILinkRepository } from '@modules/drinks/repositories/i-link-repository';

@injectable()
class MultiDeleteLinkUseCase {
  constructor(
    @inject('LinkRepository')
    private linkRepository: ILinkRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const link = await this.linkRepository.multiDelete(ids)

    return link
  }
}

export { MultiDeleteLinkUseCase }
