import { inject, injectable } from "tsyringe"
import { HttpResponse } from '@shared/helpers/http'
import { ICategoriaRepository } from "@modules/drinks/repositories/i-categoria-repository"

@injectable()
class IdSelectCategoriaUseCase {
  constructor(
    @inject('CategoriaRepository')
    private categoriaRepository: ICategoriaRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const categoria = await this.categoriaRepository.idSelect(id)

    return categoria
  }
}

export { IdSelectCategoriaUseCase }
