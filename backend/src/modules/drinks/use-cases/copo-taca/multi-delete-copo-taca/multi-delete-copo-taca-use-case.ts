import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers';
import { ICopoTacaRepository } from '@modules/drinks/repositories/i-copo-taca-repository';

@injectable()
class MultiDeleteCopoTacaUseCase {
  constructor(
    @inject('CopoTacaRepository')
    private copoTacaRepository: ICopoTacaRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const copoTaca = await this.copoTacaRepository.multiDelete(ids)

    return copoTaca
  }
}

export { MultiDeleteCopoTacaUseCase }
