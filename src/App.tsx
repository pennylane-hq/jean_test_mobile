import { UIProvider } from 'ui/config'
import { ApiProvider } from 'api'
import { Dummy } from './Dummy'

/**
 * API token to authenticate requests
 * provided by email.
 */
const API_TOKEN = ''

const App = () => {
  return (
    <ApiProvider url="https://jean-test-api.herokuapp.com/" token={API_TOKEN}>
      <UIProvider>
        <Dummy />
      </UIProvider>
    </ApiProvider>
  )
}

export default App
