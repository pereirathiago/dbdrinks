import { IDicaRepository } from '@modules/drinks/repositories/i-dica-repository'
import { HttpResponse } from '@shared/helpers'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  id: string
  drinkId: string
  dica: string
}

@injectable()
class UpdateDicaUseCase {
  constructor(@inject('DicaRepository')
  private dicaRepository: IDicaRepository
  ) { }

  async execute({
    id,
    drinkId,
    dica,
  }: IRequest): Promise<HttpResponse> {
    const dicaC = await this.dicaRepository.update({
      id,
      drinkId,
      dica,
    })

    return dicaC
  }
}

export { UpdateDicaUseCase }

