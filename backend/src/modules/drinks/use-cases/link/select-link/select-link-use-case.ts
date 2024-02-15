import { ILinkRepository } from '@modules/drinks/repositories/i-link-repository'
import { inject, injectable } from 'tsyringe'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectLinkUseCase {
  constructor(
    @inject('LinkRepository')
    private linkRepository: ILinkRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const link = await this.linkRepository.select(filter)

    const newLink = {
      items: link.data,
      hasNext: false
    }

    return newLink
  }
}

export { SelectLinkUseCase }
