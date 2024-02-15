import { ICopoTacaDTO } from '@modules/drinks/dtos/i-copo-taca-dto';
import { ICopoTacaRepository } from '@modules/drinks/repositories/i-copo-taca-repository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: ICopoTacaDTO[],
  hasNext: boolean
}

@injectable()
class ListCopoTacaUseCase {
  constructor(
    @inject('CopoTacaRepository')
    private copoTacaRepository: ICopoTacaRepository
  ) { }

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const copoTaca = await this.copoTacaRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countCopoTaca = await this.copoTacaRepository.count(
      search,
      filter
    )

    const numeroCopoTaca = page * rowsPerPage

    const copoTacaResponse = {
      items: copoTaca.data,
      hasNext: numeroCopoTaca < countCopoTaca.data.count
    }

    return copoTacaResponse
  }
}

export { ListCopoTacaUseCase };
