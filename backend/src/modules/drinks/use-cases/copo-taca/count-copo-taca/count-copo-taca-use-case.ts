import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { ICopoTacaRepository } from '@modules/drinks/repositories/i-copo-taca-repository'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountCopoTacaUseCase {
  constructor(
    @inject('CopoTacaRepository')
    private copoTacaRepository: ICopoTacaRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const copoTacaCount = await this.copoTacaRepository.count(
      search,
      filter
    )

    return copoTacaCount
  }
}

export { CountCopoTacaUseCase }
