import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { ICopoTacaRepository } from '@modules/drinks/repositories/i-copo-taca-repository'

@injectable()
class GetCopoTacaUseCase {
  constructor(
    @inject('CopoTacaRepository')
    private copoTacaRepository: ICopoTacaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const copoTaca = await this.copoTacaRepository.get(id)

    return copoTaca
  }
}

export { GetCopoTacaUseCase }
