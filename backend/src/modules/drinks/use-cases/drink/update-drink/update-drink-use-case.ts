import { IDrinkRepository } from '@modules/drinks/repositories/i-drink-repository'
import { HttpResponse } from '@shared/helpers'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  id: string
  tipoId: string
  copoTacaId: string
  destiladoPrincipalId: string
  categoriaId: string
  grupoId: string
  nome: string
  descricao: string
}

@injectable()
class UpdateDrinkUseCase {
  constructor(@inject('DrinkRepository')
  private drinkRepository: IDrinkRepository
  ) { }

  async execute({
    id,
    nome, 
    descricao,
    categoriaId,
    copoTacaId, 
    destiladoPrincipalId, 
    grupoId, 
    tipoId,
  }: IRequest): Promise<HttpResponse> {
    const drink = await this.drinkRepository.update({
      id,
      nome, 
      descricao,
      categoriaId,
      copoTacaId, 
      destiladoPrincipalId, 
      grupoId, 
      tipoId,
    })

    return drink
  }
}

export { UpdateDrinkUseCase }

