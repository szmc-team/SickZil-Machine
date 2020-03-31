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

describe('<Explorer />', () => {
  it('Render without crash', async () => {
    let entires = [
      { id: '1', name: 'file.ext', blob: new Blob(), url: image.imageUrl() },
    ]
    const { findByText, container } = render(
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
    )

    await wait()

    const deleteButton = await findByText('DELETE')
    fireEvent.click(deleteButton)
    await waitForDomChange({ container })
  })
})
