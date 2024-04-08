import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PrismaRepository } from '../repositories/prisma-repository'
import prisma from '../repositories/__mocks__/prisma-repository'

const prismaRepository = new PrismaRepository()

// vi.mock('../repositories/prisma-repository')

describe('text cases', () =>{

  beforeEach(() =>{
    vi.restoreAllMocks()
  })

  it('should be able to list all texts', async () =>{

    const mockText = {
      id: '1',
      content: 'content',
      sender: 'sender',
      createdAt: new Date()
    }

    prisma.text.findMany.mockResolvedValue([mockText])

    const texts = await prismaRepository.getTexts()


    expect(texts[0].content).toContain('Olá')
  })

  it('should be able to create a text', async () =>{
    const newText = { content: 'Hello bot!', sender: 'User'};

    prisma.text.create.mockResolvedValue({ ...newText, id: '1', createdAt: new Date() });

    const text = await prismaRepository.createText(newText)

    expect(text.content).toContain(newText.content)
  })
})