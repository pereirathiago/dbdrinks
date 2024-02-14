import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { ITipoRepository } from '@modules/drinks/repositories/i-tipo-repository'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountTipoUseCase {
  constructor(
    @inject('TipoRepository')
    private tipoRepository: ITipoRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const tipoCount = await this.tipoRepository.count(
      search,
      filter
    )

    return tipoCount
  }
}

export { CountTipoUseCase }
