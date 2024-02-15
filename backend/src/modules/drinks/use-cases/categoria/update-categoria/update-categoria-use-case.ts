import { ICategoriaRepository } from '@modules/drinks/repositories/i-categoria-repository'
import { HttpResponse } from '@shared/helpers'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  id: string
  nome: string
  descricao: string
}

@injectable()
class UpdateCategoriaUseCase {
  constructor(@inject('CategoriaRepository')
  private categoriaRepository: ICategoriaRepository
  ) { }

  async execute({
    id,
    nome,
    descricao,
  }: IRequest): Promise<HttpResponse> {
    const categoria = await this.categoriaRepository.update({
      id,
      nome,
      descricao,
    })

    return categoria
  }
}

export { UpdateCategoriaUseCase }

