import { describe, expect, it, vi } from 'vitest'
import { PrismaRepository } from '../repositories/prisma-repository'
import prisma from '../repositories/__mocks__/prisma-repository'

const prismaRepository = new PrismaRepository()

// vi.mock('../repositories/prisma-repository')

describe('text routes', () =>{
  it('should be able to list all texts', async () =>{

    const mockText = {
      id: '1',
      content: 'content',
      sender: 'sender',
      createdAt: new Date()
    }

    prisma.text.findMany.mockResolvedValue([mockText])

    const texts = await prismaRepository.getTexts()


    console.log(texts[0])

    expect(texts[0].content).toContain('Olá')
  })
})