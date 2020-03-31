import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Editor from './Editor'

describe('<Editor />', () => {
  it('render without crash', () => {
    render(<Editor />)
    expect(true).toBe(true)
  })

  it('check canvas loading', () => {
    const { getByLabelText, getByAltText } = render(<Editor />)
    const input = getByLabelText('editor_input')
    fireEvent.change(input, { target: { value: '' } })
    const image = getByAltText('Image not found')
    expect(image).toBeInTheDocument
  })
})
