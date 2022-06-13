import { peckPortalClient } from '../../Api'
import { AxiosClient } from '../BaseResource'

export const TicketResource = {
  loader: new AxiosClient({
    client: peckPortalClient,
    resourceName: 'tickets'
  })
}
