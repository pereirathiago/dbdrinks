import { inject, injectable } from 'tsyringe'
import { AppError } from '@shared/errors/app-error'
import { ITermoUsoRepository } from '@modules/security/repositories/i-termo-uso-repository'
import { TermoUso } from '@modules/security/infra/typeorm/entities/termo-uso'

interface IRequest {
  ip: string
  modeloDispositivo: string
  userId: string
}

@injectable()
class CreateTermoUsoUseCase {
  constructor(@inject('TermoUsoRepository')
    private termoUsoRepository: ITermoUsoRepository
  ) {}

  async execute({
    ip,
    modeloDispositivo,
    userId
  }: IRequest): Promise<TermoUso> {
    const result = await this.termoUsoRepository.create({
        ip,
        modeloDispositivo,
        userId
      })
      .then(termoUsoResult => {
        return termoUsoResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateTermoUsoUseCase }
