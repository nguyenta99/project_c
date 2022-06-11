import { peckPortalClient } from '../../Api'
import { AxiosClient } from '../BaseResource'

export const UserResource = {
  loader: new AxiosClient({
    client: peckPortalClient,
    resourceName: 'users'
  })
}
