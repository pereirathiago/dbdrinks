import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { GetEmailProfileUseCase } from './get-email-profile-use-case'

class GetEmailProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {email} = request.query
    const getEmailProfileUseCase = container.resolve(GetEmailProfileUseCase)
    const profile = await getEmailProfileUseCase.execute(email as string)

    return response.status(profile.statusCode).json(profile.data)
  }
}

export { GetEmailProfileController }
