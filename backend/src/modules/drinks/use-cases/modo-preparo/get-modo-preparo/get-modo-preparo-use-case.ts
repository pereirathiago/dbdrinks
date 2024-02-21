import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { IModoPreparoRepository } from '@modules/drinks/repositories/i-modo-preparo-repository'

@injectable()
class GetModoPreparoUseCase {
  constructor(
    @inject('ModoPreparoRepository')
    private modoPreparoRepository: IModoPreparoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const modoPreparo = await this.modoPreparoRepository.get(id)

    return modoPreparo
  }
}

export { GetModoPreparoUseCase }
