import { inject, injectable } from 'tsyringe'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { HttpResponse } from '@shared/helpers'

@injectable()
class GetEmailProfileUseCase {
  constructor(@inject('ProfileRepository')
    private profileRepository: IProfileRepository
  ) {}

  async execute(email: string): Promise<HttpResponse> {
    const profile = await this.profileRepository.getTipo(email)

    return profile
  }
}

export { GetEmailProfileUseCase }
