import { Router } from 'express'
import { authenticateRoutes } from './authentication/authenticate-routes'
import { userGroupsRoutes } from './security/user-groups-routes'
import { blockReasonsRoutes } from './security/block-reasons-routes'
import { usersRoutes } from './authentication/users-routes'
import { tfaRoutes } from './authentication/tfa-routes'
import { usersSecurityRoutes } from './security/users-security-routes'
import { passwordsRoutes } from './authentication/passwords-routes'
import { modulesRoutes } from './security/modules-routes'
import { menuOptionsRoutes } from './security/menu-options-routes'
import { profilesRoutes } from './security/profiles-routes'
import { profileOptionsRoutes } from './security/profile-options-routes'
import { usersProfilesRoutes } from './security/users-profiles-routes'
import { navigationsRoutes } from './security/navigations-routes'
import { configsRoutes } from './security/configs-routes'
import { filtersRoutes } from './security/filters-routes'
import { tipoRoutes } from './drinks/tipo-routes'
import { destiladoPrincipalRoutes } from './drinks/destilado-principal-routes'
import { categoriaRoutes } from './drinks/categoria-routes'
import { copoTacaRoutes } from './drinks/copo-taca-routes'
import { grupoRoutes } from './drinks/grupo-routes'
import { drinkRoutes } from './drinks/drink-routes'
import { dicaRoutes } from './drinks/dica-routes'
import { linkRoutes } from './drinks/link-routes'
import { modoPreparoRoutes } from './drinks/modo-preparo-routes'
const router = Router()

router.use(authenticateRoutes)
router.use('/block-reasons', blockReasonsRoutes)
router.use('/user-groups', userGroupsRoutes)
router.use('/users', usersRoutes)
router.use('/tfa', tfaRoutes)
router.use('/users-security', usersSecurityRoutes)
router.use('/passwords', passwordsRoutes)
router.use('/modules', modulesRoutes)
router.use('/menu-options', menuOptionsRoutes)
router.use('/profiles', profilesRoutes)
router.use('/profile-options', profileOptionsRoutes)
router.use('/users-profiles', usersProfilesRoutes)
router.use('/navigations', navigationsRoutes)
router.use('/configs', configsRoutes)
router.use('/filters', filtersRoutes)
router.use('/tipo', tipoRoutes)
router.use('/destilado-principal', destiladoPrincipalRoutes)
router.use('/copo-taca', copoTacaRoutes)
router.use('/categoria', categoriaRoutes)
router.use('/grupo', grupoRoutes)
router.use('/drink', drinkRoutes)
router.use('/dica', dicaRoutes)
router.use('/link', linkRoutes)
router.use('/modo-preparo', modoPreparoRoutes)

export { router }
