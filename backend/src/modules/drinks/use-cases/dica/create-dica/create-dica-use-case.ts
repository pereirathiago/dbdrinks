import { IDicaRepository } from "@modules/drinks/repositories/i-dica-repository"
import { inject, injectable } from "tsyringe"

interface IRequest {
  drinkId: string
  dica: string
}

@injectable()
class CreateDicaUseCase {
  constructor(
    @inject('DicaRepository')
    private dicaRepository: IDicaRepository
  ) { }

  async execute({
    drinkId,
    dica
  }: IRequest) {
    const result = await this.dicaRepository.create({
      drinkId,
      dica
    })

    return result
  }
}

export { CreateDicaUseCase }