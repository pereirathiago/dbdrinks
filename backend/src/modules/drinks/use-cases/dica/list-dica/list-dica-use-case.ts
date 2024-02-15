import { IDicaDTO } from '@modules/drinks/dtos/i-dica-dto';
import { IDicaRepository } from '@modules/drinks/repositories/i-dica-repository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IDicaDTO[],
  hasNext: boolean
}

@injectable()
class ListDicaUseCase {
  constructor(
    @inject('DicaRepository')
    private dicaRepository: IDicaRepository
  ) { }

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const dica = await this.dicaRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countDica = await this.dicaRepository.count(
      search,
      filter
    )

    const numeroDica = page * rowsPerPage

    const dicaResponse = {
      items: dica.data,
      hasNext: numeroDica < countDica.data.count
    }

    return dicaResponse
  }
}

export { ListDicaUseCase };
