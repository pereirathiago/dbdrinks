import { IModoPreparoRepository } from "@modules/drinks/repositories/i-modo-preparo-repository"
import { inject, injectable } from "tsyringe"

interface IRequest {
  drinkId: string
  descricao: string
  passo: number
}

@injectable()
class CreateModoPreparoUseCase {
  constructor(
    @inject('ModoPreparoRepository')
    private modoPreparoRepository: IModoPreparoRepository
  ) { }

  async execute({
    drinkId,
    descricao,
    passo
  }: IRequest) {
    const result = await this.modoPreparoRepository.create({
      drinkId,
      descricao,
      passo
    })

    return result
  }
}

export { CreateModoPreparoUseCase }