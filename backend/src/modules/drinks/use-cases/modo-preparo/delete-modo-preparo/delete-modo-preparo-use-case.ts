import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { IModoPreparoRepository } from '@modules/drinks/repositories/i-modo-preparo-repository'

@injectable()
class DeleteModoPreparoUseCase {
  constructor(
    @inject('ModoPreparoRepository')
    private modoPreparoRepository: IModoPreparoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const modoPreparo = await this.modoPreparoRepository.delete(id)

    return modoPreparo
  }
}

export { DeleteModoPreparoUseCase }
