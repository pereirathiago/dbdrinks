import { IDicaRepository } from '@modules/drinks/repositories/i-dica-repository'
import { inject, injectable } from 'tsyringe'

interface ResponseProps {
  items?: object[]
  hasNext?: boolean
  value?: string
  label?: string
}

@injectable()
class SelectDicaUseCase {
  constructor(
    @inject('DicaRepository')
    private dicaRepository: IDicaRepository
  ) {}

  async execute({
    filter,
  }): Promise<ResponseProps> {
    const dica = await this.dicaRepository.select(filter)

    const newDica = {
      items: dica.data,
      hasNext: false
    }

    return newDica
  }
}

export { SelectDicaUseCase }
