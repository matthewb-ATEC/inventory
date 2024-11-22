import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi, test, expect } from 'vitest'

test('renders content', () => {
  const mockHandler = vi.fn()

  render(<button onClick={mockHandler}>example</button>)

  const element = screen.getByText('example')
  expect(element).toBeDefined()
})
