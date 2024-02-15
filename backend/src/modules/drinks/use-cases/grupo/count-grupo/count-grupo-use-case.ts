import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { IGrupoRepository } from '@modules/drinks/repositories/i-grupo-repository'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountGrupoUseCase {
  constructor(
    @inject('GrupoRepository')
    private grupoRepository: IGrupoRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const grupoCount = await this.grupoRepository.count(
      search,
      filter
    )

    return grupoCount
  }
}

export { CountGrupoUseCase }
