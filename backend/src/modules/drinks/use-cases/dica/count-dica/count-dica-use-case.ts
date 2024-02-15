import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { IDicaRepository } from '@modules/drinks/repositories/i-dica-repository'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountDicaUseCase {
  constructor(
    @inject('DicaRepository')
    private dicaRepository: IDicaRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const dicaCount = await this.dicaRepository.count(
      search,
      filter
    )

    return dicaCount
  }
}

export { CountDicaUseCase }
