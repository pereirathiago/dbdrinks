import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers';
import { IModoPreparoRepository } from '@modules/drinks/repositories/i-modo-preparo-repository';

@injectable()
class MultiDeleteModoPreparoUseCase {
  constructor(
    @inject('ModoPreparoRepository')
    private modoPreparoRepository: IModoPreparoRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const modoPreparo = await this.modoPreparoRepository.multiDelete(ids)

    return modoPreparo
  }
}

export { MultiDeleteModoPreparoUseCase }
