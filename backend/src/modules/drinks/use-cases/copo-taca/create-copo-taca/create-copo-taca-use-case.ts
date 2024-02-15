import { ICopoTacaRepository } from "@modules/drinks/repositories/i-copo-taca-repository"
import { inject, injectable } from "tsyringe"

interface IRequest {
  nome: string
  descricao: string
}

@injectable()
class CreateCopoTacaUseCase {
  constructor(
    @inject('CopoTacaRepository')
    private copoTacaRepository: ICopoTacaRepository
  ) { }

  async execute({
    nome,
    descricao
  }: IRequest) {
    const result = await this.copoTacaRepository.create({
      nome,
      descricao
    })

    return result
  }
}

export { CreateCopoTacaUseCase }