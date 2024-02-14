import { inject, injectable } from "tsyringe"
import { HttpResponse } from '@shared/helpers/http'
import { ITipoRepository } from "@modules/drinks/repositories/i-tipo-repository"

@injectable()
class IdSelectTipoUseCase {
  constructor(
    @inject('TipoRepository')
    private tipoRepository: ITipoRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const tipo = await this.tipoRepository.idSelect(id)

    return tipo
  }
}

export { IdSelectTipoUseCase }
