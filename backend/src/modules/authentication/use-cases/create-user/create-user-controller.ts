import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from '@modules/security/use-cases/user/create-user/create-user-use-case'
import { CreateUserProfileUseCase } from '@modules/security/use-cases/user-profile/create-user-profile/create-user-profile-use-case'
import { HttpResponse, ok, serverError } from '@shared/helpers'

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, login, password } = request.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    const userResponse = await createUserUseCase.execute({
      name,
      login,
      userGroupId: "ca49908a-28cd-4573-808c-36c5f42a2e68",
      password,
    })

    if (userResponse.statusCode != 200) {
      return response.status(userResponse.statusCode).json(userResponse)
    }

    const createUserProfileUseCase = container.resolve(CreateUserProfileUseCase)

    let userProfileResponse: HttpResponse

    userProfileResponse = await createUserProfileUseCase.execute({
      userId: userResponse.data.id,
      profileId: "72eab2e7-d74b-4320-890c-c7f33b743005"
    })

    return response.status(userProfileResponse.statusCode).json(userProfileResponse)
  }
}

export { CreateUserController }
