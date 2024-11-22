import { test, describe, beforeEach, expect, afterAll } from 'vitest'
import supertest from 'supertest'
import app from '../src/app'
import helper from './helper'

const api = supertest(app)

beforeEach(async () => {
  return
})

describe('example', () => {
  test('true is true', async () => {
    expect(helper.isTrue, true)
  })
})

afterAll(async () => {
  return
})
