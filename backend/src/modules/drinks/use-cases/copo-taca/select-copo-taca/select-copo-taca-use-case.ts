import { ICopoTacaRepository } from '@modules/drinks/repositories/i-copo-taca-repository'
import { inject, injectable } from 'tsyringe'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectCopoTacaUseCase {
  constructor(
    @inject('CopoTacaRepository')
    private copoTacaRepository: ICopoTacaRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const copoTaca = await this.copoTacaRepository.select(filter)

    const newCopoTaca = {
      items: copoTaca.data,
      hasNext: false
    }

    return newCopoTaca
  }
}

export { SelectCopoTacaUseCase }
