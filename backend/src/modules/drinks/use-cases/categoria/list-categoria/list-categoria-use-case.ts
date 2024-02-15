import { ICategoriaDTO } from '@modules/drinks/dtos/i-categoria-dto';
import { ICategoriaRepository } from '@modules/drinks/repositories/i-categoria-repository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  search: string,
  page: number,
  rowsPerPage: number,
  order: string,
  filter?: string
}

interface ResponseProps {
  items: ICategoriaDTO[],
  hasNext: boolean
}

@injectable()
class ListCategoriaUseCase {
  constructor(
    @inject('CategoriaRepository')
    private categoriaRepository: ICategoriaRepository
  ) { }

  async execute({
    search = '',
    page = 0,
    rowsPerPage = 50,
    order = '',
    filter
  }: IRequest): Promise<ResponseProps> {
    const newPage = page !== 0 ? page - 1 : 0

    const categoria = await this.categoriaRepository.list(
      search,
      newPage,
      rowsPerPage,
      order,
      filter
    )

    const countCategoria = await this.categoriaRepository.count(
      search,
      filter
    )

    const numeroCategoria = page * rowsPerPage

    const categoriaResponse = {
      items: categoria.data,
      hasNext: numeroCategoria < countCategoria.data.count
    }

    return categoriaResponse
  }
}

export { ListCategoriaUseCase };
