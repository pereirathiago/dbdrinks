import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { IDestiladoPrincipalRepository } from '@modules/drinks/repositories/i-destilado-principal-repository'

interface IRequest {
  search: string,
  filter?: string
}

@injectable()
class CountDestiladoPrincipalUseCase {
  constructor(
    @inject('DestiladoPrincipalRepository')
    private destiladoPrincipalRepository: IDestiladoPrincipalRepository
  ) {}

  async execute({
    search,
    filter
  }: IRequest): Promise<HttpResponse> {
    const destiladoPrincipalCount = await this.destiladoPrincipalRepository.count(
      search,
      filter
    )

    return destiladoPrincipalCount
  }
}

export { CountDestiladoPrincipalUseCase }
