import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { ITermoUsoRepository } from '@modules/security/repositories/i-termo-uso-repository'

@injectable()
class GetEmailTermoUsoUseCase {
  constructor(@inject('TermoUsoRepository')
    private termoUsoRepository: ITermoUsoRepository
  ) {}

  async execute(email: string): Promise<HttpResponse> {
    const termoUso = await this.termoUsoRepository.getByEmail(email)

    return termoUso
  }
}

export { GetEmailTermoUsoUseCase }
