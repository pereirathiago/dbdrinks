import { inject, injectable } from "tsyringe"
import { HttpResponse } from '@shared/helpers/http'
import { IDicaRepository } from "@modules/drinks/repositories/i-dica-repository"

@injectable()
class IdSelectDicaUseCase {
  constructor(
    @inject('DicaRepository')
    private dicaRepository: IDicaRepository
  ) {}

  async execute({ id }): Promise<HttpResponse> {
    const dica = await this.dicaRepository.idSelect(id)

    return dica
  }
}

export { IdSelectDicaUseCase }
