import { IModoPreparoDTO } from '@modules/drinks/dtos/i-modo-preparo-dto';
import { IModoPreparoRepository } from '@modules/drinks/repositories/i-modo-preparo-repository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IModoPreparoDTO[],
  hasNext: boolean
}

@injectable()
class ListModoPreparoUseCase {
  constructor(
    @inject('ModoPreparoRepository')
    private modoPreparoRepository: IModoPreparoRepository
  ) { }

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const modoPreparo = await this.modoPreparoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countModoPreparo = await this.modoPreparoRepository.count(
      search,
      filter
    )

    const numeroModoPreparo = page * rowsPerPage

    const modoPreparoResponse = {
      items: modoPreparo.data,
      hasNext: numeroModoPreparo < countModoPreparo.data.count
    }

    return modoPreparoResponse
  }
}

export { ListModoPreparoUseCase };
