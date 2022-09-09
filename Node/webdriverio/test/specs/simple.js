const { AxeDevToolsWebdriverIO } = require('@axe-devtools/webdriverio')
const webdriverio = require('webdriverio')

let client

describe('simple amazon page', () => {
  beforeEach(async () => {
    client = await webdriverio.remote({
      services: ['chromedriver'],
      capabilities: {
        browserName: 'chrome'
      },
      logLevel: 'info'
    })
    await client.url('https://broken-workshop.dequelabs.com/')
  })

  afterEach(async () => {
    await client.deleteSession()
  })

  it('console.log the accessibility violations', async () => {
    const attest = new AxeDevToolsWebdriverIO({ client }).disableFrame('iframe')
    const results = await attest.analyze()
    console.log(results.violations)
  })
})
