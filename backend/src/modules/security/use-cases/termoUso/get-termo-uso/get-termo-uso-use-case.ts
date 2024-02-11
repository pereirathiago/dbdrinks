import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { ITermoUsoRepository } from '@modules/security/repositories/i-termo-uso-repository'

@injectable()
class GetTermoUsoUseCase {
  constructor(@inject('TermoUsoRepository')
    private termoUsoRepository: ITermoUsoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const termoUso = await this.termoUsoRepository.getById(id)

    return termoUso
  }
}

export { GetTermoUsoUseCase }
