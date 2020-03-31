import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Editor from './Editor'

describe('<Editor />', () => {
  it('mathces snapshot', () => {
    const utils = render(<Editor />)
    expect(utils.container).toMatchSnapshot()
  })
  it('check canvas loading', () => {
    const utils = render(<Editor />)
    const input = utils.getByLabelText('editor_input')
    fireEvent.change(input, { target: { value: '' } })
    const image = utils.getByAltText('Image not found')
    expect(image).toBeInTheDocument
  })
})
