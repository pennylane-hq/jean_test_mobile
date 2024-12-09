import { render, screen } from '@testing-library/react-native'
import { Dummy } from './Dummy'
import { UIProvider } from 'ui/config'

describe('Dummy', () => {
  it('should render the title', () => {
    render(
      <UIProvider>
        <Dummy />
      </UIProvider>,
    )
    expect(screen.getByText('Welcome to JeanTest 👋')).toBeTruthy()
  })
})
