import { IDestiladoPrincipalDTO } from '@modules/drinks/dtos/i-destilado-principal-dto';
import { IDestiladoPrincipalRepository } from '@modules/drinks/repositories/i-destilado-principal-repository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: IDestiladoPrincipalDTO[],
  hasNext: boolean
}

@injectable()
class ListDestiladoPrincipalUseCase {
  constructor(
    @inject('DestiladoPrincipalRepository')
    private destiladoPrincipalRepository: IDestiladoPrincipalRepository
  ) { }

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const destiladoPrincipal = await this.destiladoPrincipalRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countDestiladoPrincipal = await this.destiladoPrincipalRepository.count(
      search,
      filter
    )

    const numeroDestiladoPrincipal = page * rowsPerPage

    const destiladoPrincipalResponse = {
      items: destiladoPrincipal.data,
      hasNext: numeroDestiladoPrincipal < countDestiladoPrincipal.data.count
    }

    return destiladoPrincipalResponse
  }
}

export { ListDestiladoPrincipalUseCase };
