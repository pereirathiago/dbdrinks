import { ITermoUsoDTO } from '@modules/security/dtos/i-termo-uso-dto'
import { ITermoUsoRepository } from '@modules/security/repositories/i-termo-uso-repository'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: ITermoUsoDTO[],
  hasNext: boolean
}

@injectable()
class ListTermoUsoUseCase {
  constructor(@inject('TermoUsoRepository')
    private termoUsoRepository: ITermoUsoRepository
  ) {}

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const termoUsos = await this.termoUsoRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countTermoUsos = await this.termoUsoRepository.count(
      search,
      filter
    )

    const numeroTermoUso = page * rowsPerPage

    const termoUsosResponse = {
      items: termoUsos.data,
      hasNext: numeroTermoUso < countTermoUsos.data.count
    }

    return termoUsosResponse
  }
}

export { ListTermoUsoUseCase }
