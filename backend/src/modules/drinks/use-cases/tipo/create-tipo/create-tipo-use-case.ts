import { ITipoRepository } from "@modules/drinks/repositories/i-tipo-repository"
import { inject, injectable } from "tsyringe"

interface IRequest {
  nome: string
  descricao: string
}

@injectable()
class CreateTipoUseCase {
  constructor(
    @inject('TipoRepository')
    private tipoRepository: ITipoRepository
  ) { }

  async execute({
    nome,
    descricao
  }: IRequest) {
    const result = await this.tipoRepository.create({
      nome,
      descricao
    })

    return result
  }
}

export { CreateTipoUseCase }