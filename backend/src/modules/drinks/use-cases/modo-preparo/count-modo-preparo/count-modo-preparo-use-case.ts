import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { IModoPreparoRepository } from '@modules/drinks/repositories/i-modo-preparo-repository'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountModoPreparoUseCase {
  constructor(
    @inject('ModoPreparoRepository')
    private modoPreparoRepository: IModoPreparoRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const modoPreparoCount = await this.modoPreparoRepository.count(
      search,
      filter
    )

    return modoPreparoCount
  }
}

export { CountModoPreparoUseCase }
