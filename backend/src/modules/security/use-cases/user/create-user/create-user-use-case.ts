import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'
import { User } from '@modules/security/infra/typeorm/entities/user'
import { IUserSecurityRepository } from '@modules/security/repositories/i-user-security-repository'
import { IUserRepository } from '@modules/authentication/repositories/i-user-repository'
import { HttpResponse, conflictError } from '@shared/helpers'

interface IRequest {
  userGroupId?: string
  name?: string
  login?: string
  password?: string
  isAdmin?: boolean
  isSuperUser?: boolean
  isBlocked?: boolean
  blockReasonId?: string
  mustChangePasswordNextLogon?: boolean
  mustActiveTwoFactorAuthentication?: boolean
  avatar?: string
  isDisabled?: boolean
}

@injectable()
class CreateUserUseCase {
  constructor(@inject('UserSecurityRepository')
    private userSecurityRepository: IUserSecurityRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({
    userGroupId,
    name,
    login,
    password,
    isAdmin,
    isSuperUser,
    isBlocked,
    blockReasonId,
    mustChangePasswordNextLogon,
    mustActiveTwoFactorAuthentication,
    avatar,
    isDisabled
  }: IRequest): Promise<HttpResponse> {
    const passwordBtoa = btoa(password)
    const passwordHash = await hash(passwordBtoa, 8)

    if (login) {
      const userByEmail = await this.userRepository.findByEmail(login)
      if (userByEmail) return conflictError('E-Mail')
    }

    const result = await this.userSecurityRepository.create({
        userGroupId,
        name,
        login,
        password: passwordHash,
        isAdmin,
        isSuperUser,
        isBlocked,
        blockReasonId,
        mustChangePasswordNextLogon,
        mustActiveTwoFactorAuthentication,
        avatar,
        isDisabled
      })
      .then(userResult => {
        return userResult
      })
      .catch(error => {
        return error
      })

    return result
  }
}

export { CreateUserUseCase }
