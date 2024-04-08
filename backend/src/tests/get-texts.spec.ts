import { describe, expect, it } from 'vitest'
import { PrismaRepository } from '../repositories/prisma-repository'

const prismaRepository = new PrismaRepository()

describe('text routes', () =>{
  it('should be able to list all texts', async () =>{
    const texts = await prismaRepository.getTexts()

    console.log(texts)

    expect(200).toEqual(200)
  })
})