import { peckPortalClient } from '../../Api'
import { AxiosClient } from '../BaseResource'

export const ProductResource = {
  loader: new AxiosClient({
    client: peckPortalClient,
    resourceName: 'products'
  })
}

