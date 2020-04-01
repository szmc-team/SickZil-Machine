import React from 'react'
import { MockedProvider } from '@apollo/client/testing'
import {
  render,
  wait,
  fireEvent,
  waitForDomChange,
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Explorer from './Explorer'
import { image } from 'faker'
import { Provider } from 'react-redux'
import { configureStore } from '~/store'

describe('<Explorer />', () => {
  it('Render without crash', async () => {
    const store = configureStore()
    let entires = [
      { id: '1', name: 'file.ext', blob: new Blob(), url: image.imageUrl() },
    ]
    const { findByText, container } = render(
      <Provider store={store}>
        <MockedProvider
          resolvers={{
            Query: {
              fileEntries: () => entires,
            },
            Mutation: {
              deleteFileEntry: () => entires.pop(),
            },
          }}
          addTypename={false}
        >
          <Explorer />
        </MockedProvider>
      </Provider>
    )

    await wait()

    const deleteButton = await findByText('DELETE')
    fireEvent.click(deleteButton)
    await waitForDomChange({ container })
  })
})
