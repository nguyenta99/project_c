import { peckPortalClient } from '../../Api'
import { AxiosClient } from '../BaseResource'

export const VariantResource = {
  loader: new AxiosClient({
    client: peckPortalClient,
    resourceName: 'variants'
  })
}

