import React from 'react'
import { render } from '@testing-library/react'
import Editor from './Editor'
import { configureStore } from '~/store'
import { Provider } from 'react-redux'

describe('<Editor />', () => {
  it('render without crash', () => {
    const store = configureStore()

    render(
      <Provider store={store}>
        <Editor />
      </Provider>
    )
    expect(true).toBe(true)
  })
})
