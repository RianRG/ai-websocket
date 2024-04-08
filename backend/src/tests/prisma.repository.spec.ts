import { beforeEach, describe, expect, it, vi } from 'vitest'
import { PrismaRepository } from '../repositories/prisma-repository'
import prisma from '../repositories/__mocks__/prisma-repository'

const prismaRepository = new PrismaRepository()

vi.mock('../libs/prisma')

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

  it('should be able to create a image request', async () =>{
    const testImageRequest = { content: 'Id like a photo of a cake'};

    prisma.imageRequest.create.mockResolvedValue({ ...testImageRequest, id: '1', createdAt: new Date() })

    const imageRequest = await prismaRepository.createImageRequest(testImageRequest.content)

    expect(imageRequest.content).toContain(testImageRequest.content)
  })

  it('should be able to list all images', async () =>{
    const mockImage = {
      id: '1',
      link: 'www.any.com',
      imageRequestId: '2',
      createdAt: new Date()
    }

    prisma.image.findMany.mockResolvedValue([mockImage])

    const images = await prismaRepository.getImages()


    expect(images[0].imageRequest).toContain('Uma pessoa')
  })

  it('should be able to list all imageRequests', async () =>{
    const mockImageRequest = {
      id: '1',
      content: 'gimme a photo of weapons',
      createdAt: new Date()
    }

    prisma.imageRequest.findMany.mockResolvedValue([mockImageRequest])

    const imageRequests = await prismaRepository.getImageRequests()

    console.log(imageRequests)

    expect(200).toEqual(200);
  })
})