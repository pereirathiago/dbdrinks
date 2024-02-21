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
import { ITermoUsoRepository } from '@modules/security/repositories/i-termo-uso-repository'
import { TermoUsoRepository } from '@modules/security/infra/typeorm/repositories/termo-uso-repository'
import { ITipoRepository } from '@modules/drinks/repositories/i-tipo-repository'
import { TipoRepository } from '@modules/drinks/infra/repositories/tipo-repository'
import { IDestiladoPrincipalRepository } from '@modules/drinks/repositories/i-destilado-principal-repository'
import { DestiladoPrincipalRepository } from '@modules/drinks/infra/repositories/destilado-principal-repository'
import { ICategoriaRepository } from '@modules/drinks/repositories/i-categoria-repository'
import { CategoriaRepository } from '@modules/drinks/infra/repositories/categoria-repository'
import { ICopoTacaRepository } from '@modules/drinks/repositories/i-copo-taca-repository'
import { CopoTacaRepository } from '@modules/drinks/infra/repositories/copo-taca-repository'
import { IGrupoRepository } from '@modules/drinks/repositories/i-grupo-repository'
import { GrupoRepository } from '@modules/drinks/infra/repositories/grupo-repository'
import { IDrinkRepository } from '@modules/drinks/repositories/i-drink-repository'
import { DrinkRepository } from '@modules/drinks/infra/repositories/drink-repository'
import { IDicaRepository } from '@modules/drinks/repositories/i-dica-repository'
import { DicaRepository } from '@modules/drinks/infra/repositories/dica-repository'
import { ILinkRepository } from '@modules/drinks/repositories/i-link-repository'
import { LinkRepository } from '@modules/drinks/infra/repositories/link-repository'
import { ModoPreparoRepository } from '@modules/drinks/infra/repositories/modo-preparo-repository'
import { IModoPreparoRepository } from '@modules/drinks/repositories/i-modo-preparo-repository'

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
container.registerSingleton<ITipoRepository>('TipoRepository', TipoRepository)
container.registerSingleton<IDestiladoPrincipalRepository>('DestiladoPrincipalRepository', DestiladoPrincipalRepository)
container.registerSingleton<ICopoTacaRepository>('CopoTacaRepository', CopoTacaRepository)
container.registerSingleton<ICategoriaRepository>('CategoriaRepository', CategoriaRepository)
container.registerSingleton<IGrupoRepository>('GrupoRepository', GrupoRepository)
container.registerSingleton<IDrinkRepository>('DrinkRepository', DrinkRepository)
container.registerSingleton<IDicaRepository>('DicaRepository', DicaRepository)
container.registerSingleton<ILinkRepository>('LinkRepository', LinkRepository)
container.registerSingleton<IModoPreparoRepository>('ModoPreparoRepository', ModoPreparoRepository)