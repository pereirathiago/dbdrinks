import { inject, injectable } from "tsyringe"
import { HttpResponse } from '@shared/helpers/http'
import { ILinkRepository } from "@modules/drinks/repositories/i-link-repository"

@injectable()
class IdSelectLinkUseCase {
  constructor(
    @inject('LinkRepository')
    private linkRepository: ILinkRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const link = await this.linkRepository.idSelect(id)

    return link
  }
}

export { IdSelectLinkUseCase }
