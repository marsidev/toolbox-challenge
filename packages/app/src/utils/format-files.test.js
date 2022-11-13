import { formatFilesData } from './format-files'
import { describe, it, expect } from '@jest/globals'
import mockResponse from './mock'

describe('formatFilesData', () => {
  const formatted = formatFilesData(mockResponse)

  it('Has the expected schema', () => {
    expect(Array.isArray(formatted)).toBeTruthy()
    expect(formatted.length).toBeGreaterThan(0)

    formatted.forEach(lineFile => {
      expect(typeof lineFile).toBe('object')
      expect(lineFile).toHaveProperty('file')
      expect(lineFile).toHaveProperty('text')
      expect(lineFile).toHaveProperty('number')
      expect(lineFile).toHaveProperty('hex')

      expect(typeof lineFile.file).toBe('string')
      expect(typeof lineFile.text).toBe('string')
      expect(typeof lineFile.number).toBe('number')
      expect(typeof lineFile.hex).toBe('string')
    })
  })
})
