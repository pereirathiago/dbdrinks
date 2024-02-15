import { ILinkDTO } from '@modules/drinks/dtos/i-link-dto';
import { ILinkRepository } from '@modules/drinks/repositories/i-link-repository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: ILinkDTO[],
  hasNext: boolean
}

@injectable()
class ListLinkUseCase {
  constructor(
    @inject('LinkRepository')
    private linkRepository: ILinkRepository
  ) { }

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const link = await this.linkRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countLink = await this.linkRepository.count(
      search,
      filter
    )

    const numeroLink = page * rowsPerPage

    const linkResponse = {
      items: link.data,
      hasNext: numeroLink < countLink.data.count
    }

    return linkResponse
  }
}

export { ListLinkUseCase };
