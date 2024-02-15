import { IDrinkRepository } from "@modules/drinks/repositories/i-drink-repository"
import { inject, injectable } from "tsyringe"

interface IRequest {
  tipoId: string
  copoTacaId: string
  destiladoPrincipalId: string
  categoriaId: string
  grupoId: string
  nome: string
  descricao: string
}

@injectable()
class CreateDrinkUseCase {
  constructor(
    @inject('DrinkRepository')
    private drinkRepository: IDrinkRepository
  ) { }

  async execute({
    nome,
    descricao,
    categoriaId,
    copoTacaId, 
    destiladoPrincipalId, 
    grupoId, 
    tipoId,
  }: IRequest) {
    const result = await this.drinkRepository.create({
      nome,
      descricao,
      categoriaId,
      copoTacaId, 
      destiladoPrincipalId, 
      grupoId, 
      tipoId,
    })

    return result
  }
}

export { CreateDrinkUseCase }