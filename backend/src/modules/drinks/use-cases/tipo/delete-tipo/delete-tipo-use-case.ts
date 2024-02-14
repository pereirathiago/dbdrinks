import { inject, injectable } from 'tsyringe'
import { HttpResponse } from '@shared/helpers'
import { ITipoRepository } from '@modules/drinks/repositories/i-tipo-repository'

@injectable()
class DeleteTipoUseCase {
  constructor(
    @inject('TipoRepository')
    private tipoRepository: ITipoRepository
  ) {}

  async execute(id: string): Promise<HttpResponse> {
    const tipo = await this.tipoRepository.delete(id)

    return tipo
  }
}

export { DeleteTipoUseCase }
