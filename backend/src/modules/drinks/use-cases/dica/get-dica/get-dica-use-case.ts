import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { IDicaRepository } from '@modules/drinks/repositories/i-dica-repository'

@injectable()
class GetDicaUseCase {
  constructor(
    @inject('DicaRepository')
    private dicaRepository: IDicaRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const dica = await this.dicaRepository.get(id)

    return dica
  }
}

export { GetDicaUseCase }
