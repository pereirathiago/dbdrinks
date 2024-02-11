import { inject, injectable } from 'tsyringe'
import { Cep } from '@modules/comum/infra/typeorm/entities/cep'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetEnderecoByCepUseCase {
  constructor(@inject('CepRepository')
    private cepRepository: ICepRepository
  ) {}

  async execute(cep: string): Promise<HttpResponse> {
    const cepInfo = await this.cepRepository.getEnderecoByCep(cep)

    return cepInfo
  }
}

export { GetEnderecoByCepUseCase }
