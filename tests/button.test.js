import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Button } from 'antd'

describe('antd button', () => {
  
  test('could receive text as child', () => {
    const testMessage = 'Test Message'
    render(<Button>{testMessage}</Button>)
    expect(screen.getByText(testMessage)).toBeInTheDocument()
  })

  test('could be disabled', () => {
    render(<Button disabled>test</Button>)
    expect(screen.getByText('test')).toBeDisabled()
  })

  test('can fire click event', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick}>test</Button>)
    
    fireEvent.click(screen.getByText('test'))
    expect(onClick).toHaveBeenCalled()
  })

})

afterAll(() => {
  console.log('------------------> end')
})