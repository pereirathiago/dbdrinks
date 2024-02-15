import { IGrupoRepository } from "@modules/drinks/repositories/i-grupo-repository"
import { inject, injectable } from "tsyringe"

interface IRequest {
  nome: string
  descricao: string
}

@injectable()
class CreateGrupoUseCase {
  constructor(
    @inject('GrupoRepository')
    private grupoRepository: IGrupoRepository
  ) { }

  async execute({
    nome,
    descricao
  }: IRequest) {
    const result = await this.grupoRepository.create({
      nome,
      descricao
    })

    return result
  }
}

export { CreateGrupoUseCase }