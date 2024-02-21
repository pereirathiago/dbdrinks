import { IModoPreparoRepository } from '@modules/drinks/repositories/i-modo-preparo-repository'
import { HttpResponse } from '@shared/helpers'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  id: string
  drinkId: string
  descricao: string
  passo: number
}

@injectable()
class UpdateModoPreparoUseCase {
  constructor(@inject('ModoPreparoRepository')
  private modoPreparoRepository: IModoPreparoRepository
  ) { }

  async execute({
    id,
    drinkId,
    descricao,
    passo
  }: IRequest): Promise<HttpResponse> {
    const modoPreparoC = await this.modoPreparoRepository.update({
      id,
      drinkId,
      descricao,
      passo,
    })

    return modoPreparoC
  }
}

export { UpdateModoPreparoUseCase }

