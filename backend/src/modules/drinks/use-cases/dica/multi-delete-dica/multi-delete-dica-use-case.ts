import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers';
import { IDicaRepository } from '@modules/drinks/repositories/i-dica-repository';

@injectable()
class MultiDeleteDicaUseCase {
  constructor(
    @inject('DicaRepository')
    private dicaRepository: IDicaRepository
  ) {}

  async execute(ids: string[]): Promise<HttpResponse> {
    const dica = await this.dicaRepository.multiDelete(ids)

    return dica
  }
}

export { MultiDeleteDicaUseCase }
