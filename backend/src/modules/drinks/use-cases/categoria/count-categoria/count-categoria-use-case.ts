import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { ICategoriaRepository } from '@modules/drinks/repositories/i-categoria-repository'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountCategoriaUseCase {
  constructor(
    @inject('CategoriaRepository')
    private categoriaRepository: ICategoriaRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const categoriaCount = await this.categoriaRepository.count(
      search,
      filter
    )

    return categoriaCount
  }
}

export { CountCategoriaUseCase }
