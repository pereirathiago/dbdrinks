import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { ITermoUsoRepository } from '@modules/security/repositories/i-termo-uso-repository'

interface IRequest {
  search: string,
}

@injectable()
class CountTermoUsoUseCase {
  constructor(@inject('TermoUsoRepository')
    private termoUsoRepository: ITermoUsoRepository
  ) {}

  async execute({
    search
  }: IRequest): Promise<HttpResponse> {
    const termoUsosCount = await this.termoUsoRepository.count(search)

    return termoUsosCount
  }
}

export { CountTermoUsoUseCase }
