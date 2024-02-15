import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { ICategoriaRepository } from '@modules/drinks/repositories/i-categoria-repository'

@injectable()
class GetCategoriaUseCase {
  constructor(
    @inject('CategoriaRepository')
    private categoriaRepository: ICategoriaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const categoria = await this.categoriaRepository.get(id)

    return categoria
  }
}

export { GetCategoriaUseCase }
