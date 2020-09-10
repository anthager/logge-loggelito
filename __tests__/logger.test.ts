import { Logger } from '../lib/logger'
let consoleSpy: jest.SpyInstance

beforeAll(() => {
  consoleSpy = jest.spyOn(global.console, 'log').mockReturnValue()
})

afterEach(() => {
  consoleSpy.mockClear()
})

describe('Levels', () => {
  describe('when initialized with string', () => {
    describe('when level is ERROR', () => {
      const logger = new Logger({ level: 'ERROR' })
      it('should log on error level', async () => {
        const error = new Error()
        logger.error({ error: error, entries: { message: 'nice' } })
        expect(consoleSpy).toBeCalledTimes(1)
      })
      it('should not log on NOTICE level', async () => {
        logger.notice({ entries: { message: 'nice' } })
        expect(consoleSpy).not.toBeCalled()
      })
      it('should not log on INFO level', async () => {
        logger.info({ entries: { message: 'nice' } })
        expect(consoleSpy).not.toBeCalled()
      })
      it('should not log on DEBUG level', async () => {
        logger.debug({ entries: { message: 'nice' } })
        expect(consoleSpy).not.toBeCalled()
      })
    })
    describe('when level is NOTICE', () => {
      const logger = new Logger({ level: 'NOTICE' })
      it('should log on error level', async () => {
        const error = new Error()
        logger.error({ error: error, entries: { message: 'nice' } })
        expect(consoleSpy).toBeCalledTimes(1)
      })
      it('should log on NOTICE level', async () => {
        logger.notice({ entries: { message: 'nice' } })
        expect(consoleSpy).toBeCalledTimes(1)
      })
      it('should not log on INFO level', async () => {
        logger.info({ entries: { message: 'nice' } })
        expect(consoleSpy).not.toBeCalled()
      })
      it('should not log on DEBUG level', async () => {
        logger.debug({ entries: { message: 'nice' } })
        expect(consoleSpy).not.toBeCalled()
      })
    })
    describe('when level is INFO', () => {
      const logger = new Logger({ level: 'INFO' })
      it('should log on error level', async () => {
        const error = new Error()
        logger.error({ error: error, entries: { message: 'nice' } })
        expect(consoleSpy).toBeCalledTimes(1)
      })
      it('should log on NOTICE level', async () => {
        logger.notice({ entries: { message: 'nice' } })
        expect(consoleSpy).toBeCalledTimes(1)
      })
      it('should log on INFO level', async () => {
        logger.info({ entries: { message: 'nice' } })
        expect(consoleSpy).toBeCalledTimes(1)
      })
      it('should not log on DEBUG level', async () => {
        logger.debug({ entries: { message: 'nice' } })
        expect(consoleSpy).not.toBeCalled()
      })
    })
    describe('when level is DEBUG', () => {
      const logger = new Logger({ level: 'DEBUG' })
      it('should log on error level', async () => {
        const error = new Error()
        logger.error({ error: error, entries: { message: 'nice' } })
        expect(consoleSpy).toBeCalledTimes(1)
      })
      it('should log on NOTICE level', async () => {
        logger.notice({ entries: { message: 'nice' } })
        expect(consoleSpy).toBeCalledTimes(1)
      })
      it('should log on INFO level', async () => {
        logger.info({ entries: { message: 'nice' } })
        expect(consoleSpy).toBeCalledTimes(1)
      })
      it('should log on DEBUG level', async () => {
        logger.debug({ entries: { message: 'nice' } })
        expect(consoleSpy).toBeCalledTimes(1)
      })
    })
  })

  describe('initialized with number', () => {
    describe('when initilized with 2', () => {
      const logger = new Logger({ level: 2 })
      it('should log on error level', async () => {
        const error = new Error()
        logger.error({ error: error, entries: { message: 'nice' } })
        expect(consoleSpy).toBeCalledTimes(1)
      })
      it('should log on NOTICE level', async () => {
        logger.notice({ entries: { message: 'nice' } })
        expect(consoleSpy).toBeCalledTimes(1)
      })
      it('should not log on INFO level', async () => {
        logger.info({ entries: { message: 'nice' } })
        expect(consoleSpy).not.toBeCalled()
      })
      it('should not log on DEBUG level', async () => {
        logger.debug({ entries: { message: 'nice' } })
        expect(consoleSpy).not.toBeCalled()
      })
    })

    describe('when initialized with 0', () => {
      const logger = new Logger({ level: 0 })
      it('should not log on error level', async () => {
        const error = new Error()
        logger.error({ error: error, entries: { message: 'nice' } })
        expect(consoleSpy).not.toBeCalled()
      })
      it('should not log on NOTICE level', async () => {
        logger.notice({ entries: { message: 'nice' } })
        expect(consoleSpy).not.toBeCalled()
      })
      it('should not log on INFO level', async () => {
        logger.info({ entries: { message: 'nice' } })
        expect(consoleSpy).not.toBeCalled()
      })
      it('should not log on DEBUG level', async () => {
        logger.debug({ entries: { message: 'nice' } })
        expect(consoleSpy).not.toBeCalled()
      })
    })
  })
})

describe('message', () => {
  const logger = new Logger({ level: 'INFO' })
  it('should log the logging when info is called', async () => {
    logger.info({ entries: { message: 'nice' } })
    expect(consoleSpy).toBeCalledWith(JSON.stringify({ severity: 'INFO', message: 'nice' }))
  })
  it('should log error when error is called', async () => {
    const error = new Error('error')
    logger.error({ error: error, entries: { message: 'nice' } })
    const stack = JSON.parse(consoleSpy.mock.calls[0][0]).stack as string
    expect(stack).toBeTruthy()
    expect(consoleSpy).toBeCalledWith(
      JSON.stringify({ severity: 'ERROR', stack, error_message: 'error', message: 'nice' }),
    )
  })
})