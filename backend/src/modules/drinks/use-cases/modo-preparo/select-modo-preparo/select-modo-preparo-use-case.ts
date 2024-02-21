import { IModoPreparoRepository } from '@modules/drinks/repositories/i-modo-preparo-repository'
import { inject, injectable } from 'tsyringe'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectModoPreparoUseCase {
  constructor(
    @inject('ModoPreparoRepository')
    private modoPreparoRepository: IModoPreparoRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const modoPreparo = await this.modoPreparoRepository.select(filter)

    const newModoPreparo = {
      items: modoPreparo.data,
      hasNext: false
    }

    return newModoPreparo
  }
}

export { SelectModoPreparoUseCase }
