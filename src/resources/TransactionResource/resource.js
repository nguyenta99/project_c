import { peckPortalClient } from '../../Api'
import { AxiosClient } from '../BaseResource'

export const TransactionResource = {
  loader: new AxiosClient({
    client: peckPortalClient,
    resourceName: 'transactions'
  })
}
