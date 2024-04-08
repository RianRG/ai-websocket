import supertest from 'supertest'
import { app } from '../app'
import { afterAll, beforeAll, beforeEach, describe, it, expect } from 'vitest'
import { execSync } from 'child_process'

describe('text routes', async () =>{

  beforeAll(async () =>{
    await app.ready()
  })

  afterAll(async () =>{
    await app.close()
  })

  it('should be able to list all texts', async () =>{
    const texts = await supertest(app.server)
    .get('/texts')

    expect(texts.body[0].content).toContain('Olá')
    expect(texts.statusCode).toEqual(200)
  })

})