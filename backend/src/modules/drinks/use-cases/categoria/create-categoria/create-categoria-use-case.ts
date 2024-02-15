import { ICategoriaRepository } from "@modules/drinks/repositories/i-categoria-repository"
import { inject, injectable } from "tsyringe"

interface IRequest {
  nome: string
  descricao: string
}

@injectable()
class CreateCategoriaUseCase {
  constructor(
    @inject('CategoriaRepository')
    private categoriaRepository: ICategoriaRepository
  ) { }

  async execute({
    nome,
    descricao
  }: IRequest) {
    const result = await this.categoriaRepository.create({
      nome,
      descricao
    })

    return result
  }
}

export { CreateCategoriaUseCase }