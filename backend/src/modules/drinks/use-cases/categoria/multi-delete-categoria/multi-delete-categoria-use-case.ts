import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers';
import { ICategoriaRepository } from '@modules/drinks/repositories/i-categoria-repository';

@injectable()
class MultiDeleteCategoriaUseCase {
  constructor(
    @inject('CategoriaRepository')
    private categoriaRepository: ICategoriaRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const categoria = await this.categoriaRepository.multiDelete(ids)

    return categoria
  }
}

export { MultiDeleteCategoriaUseCase }
