import { IGrupoDTO } from '@modules/drinks/dtos/i-grupo-dto';
import { IGrupoRepository } from '@modules/drinks/repositories/i-grupo-repository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IGrupoDTO[],
  hasNext: boolean
}

@injectable()
class ListGrupoUseCase {
  constructor(
    @inject('GrupoRepository')
    private grupoRepository: IGrupoRepository
  ) { }

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const grupo = await this.grupoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countGrupo = await this.grupoRepository.count(
      search,
      filter
    )

    const numeroGrupo = page * rowsPerPage

    const grupoResponse = {
      items: grupo.data,
      hasNext: numeroGrupo < countGrupo.data.count
    }

    return grupoResponse
  }
}

export { ListGrupoUseCase };
