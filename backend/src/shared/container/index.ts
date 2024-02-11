import { container } from 'tsyringe'

import '@shared/container/providers'

import { IUserRepository } from '@modules/authentication/repositories/i-user-repository'
import { UserRepository } from '@modules/authentication/infra/typeorm/repositories/user-repository'
import { IUserSecurityRepository } from '@modules/security/repositories/i-user-security-repository'
import { UserSecurityRepository } from '@modules/security/infra/typeorm/repositories/user-security-repository'
import { IUserTokenRepository } from '@modules/authentication/repositories/i-user-token-repository'
import { UserTokenRepository } from '@modules/authentication/infra/typeorm/repositories/user-token-repository'
import { IBlockReasonRepository } from '@modules/security/repositories/i-block-reason-repository'
import { BlockReasonRepository } from '@modules/security/infra/typeorm/repositories/block-reason-repository'
import { IUserGroupRepository } from '@modules/security/repositories/i-user-group-repository'
import { UserGroupRepository } from '@modules/security/infra/typeorm/repositories/user-group-repository'
import { IModuleRepository } from '@modules/security/repositories/i-module-repository'
import { ModuleRepository } from '@modules/security/infra/typeorm/repositories/module-repository'
import { IProfileRepository } from '@modules/security/repositories/i-profile-repository'
import { ProfileRepository } from '@modules/security/infra/typeorm/repositories/profile-repository'
import { IMenuOptionRepository } from '@modules/security/repositories/i-menu-option-repository'
import { MenuOptionRepository } from '@modules/security/infra/typeorm/repositories/menu-option-repository'
import { INavigationRepository } from '@modules/security/repositories/i-navigation-repository'
import { NavigationRepository } from '@modules/security/infra/typeorm/repositories/navigation-repository'
import { IUserProfileRepository } from '@modules/security/repositories/i-user-profile-repository'
import { UserProfileRepository } from '@modules/security/infra/typeorm/repositories/user-profile-repository'
import { IProfileOptionRepository } from '@modules/security/repositories/i-profile-option-repository'
import { ProfileOptionRepository } from '@modules/security/infra/typeorm/repositories/profile-option-repository'
import { IConfigRepository } from '@modules/security/repositories/i-config-repository'
import { ConfigRepository } from '@modules/security/infra/typeorm/repositories/config-repository'
import { IFilterRepository } from '@modules/security/repositories/i-filter-repository'
import { FilterRepository } from '@modules/security/infra/typeorm/repositories/filter-repository'
import { IPaisRepository } from '@modules/comum/repositories/i-pais-repository'
import { PaisRepository } from '@modules/comum/infra/typeorm/repositories/pais-repository'
import { IEstadoRepository } from '@modules/comum/repositories/i-estado-repository'
import { EstadoRepository } from '@modules/comum/infra/typeorm/repositories/estado-repository'
import { ICidadeRepository } from '@modules/comum/repositories/i-cidade-repository'
import { CidadeRepository } from '@modules/comum/infra/typeorm/repositories/cidade-repository'
import { ICepRepository } from '@modules/comum/repositories/i-cep-repository'
import { CepRepository } from '@modules/comum/infra/typeorm/repositories/cep-repository'
import { ITermoUsoRepository } from '@modules/security/repositories/i-termo-uso-repository'
import { TermoUsoRepository } from '@modules/security/infra/typeorm/repositories/termo-uso-repository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton<IUserSecurityRepository>('UserSecurityRepository', UserSecurityRepository)
container.registerSingleton<ITermoUsoRepository>('TermoUsoRepository', TermoUsoRepository)
container.registerSingleton<IUserTokenRepository>('UserTokenRepository', UserTokenRepository)
container.registerSingleton<IBlockReasonRepository>('BlockReasonRepository', BlockReasonRepository)
container.registerSingleton<IUserGroupRepository>('UserGroupRepository', UserGroupRepository)
container.registerSingleton<IModuleRepository>('ModuleRepository', ModuleRepository)
container.registerSingleton<IProfileRepository>('ProfileRepository', ProfileRepository)
container.registerSingleton<IMenuOptionRepository>('MenuOptionRepository', MenuOptionRepository)
container.registerSingleton<INavigationRepository>('NavigationRepository', NavigationRepository)
container.registerSingleton<IUserProfileRepository>('UserProfileRepository', UserProfileRepository)
container.registerSingleton<IProfileOptionRepository>('ProfileOptionRepository', ProfileOptionRepository)
container.registerSingleton<IConfigRepository>('ConfigRepository', ConfigRepository)
container.registerSingleton<IFilterRepository>('FilterRepository', FilterRepository)
container.registerSingleton<IPaisRepository>('PaisRepository', PaisRepository)
container.registerSingleton<IEstadoRepository>('EstadoRepository', EstadoRepository)
container.registerSingleton<ICidadeRepository>('CidadeRepository', CidadeRepository)
container.registerSingleton<ICepRepository>('CepRepository', CepRepository)