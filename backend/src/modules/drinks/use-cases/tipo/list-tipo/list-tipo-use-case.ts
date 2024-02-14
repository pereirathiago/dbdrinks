import { ITipoDTO } from '@modules/drinks/dtos/i-tipo-dto';
import { ITipoRepository } from '@modules/drinks/repositories/i-tipo-repository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: ITipoDTO[],
  hasNext: boolean
}

@injectable()
class ListTipoUseCase {
  constructor(
    @inject('TipoRepository')
    private tipoRepository: ITipoRepository
  ) { }

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const tipo = await this.tipoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countTipo = await this.tipoRepository.count(
      search,
      filter
    )

    const numeroTipo = page * rowsPerPage

    const tipoResponse = {
      items: tipo.data,
      hasNext: numeroTipo < countTipo.data.count
    }

    return tipoResponse
  }
}

export { ListTipoUseCase };
