const { ClientFunction } = require('testcafe')
const scriptBuilder = require('@axe-devtools/script-builder')

function axeTestCafe(t, context = {}, options = {}, axeSource) {
  if (!(this instanceof axeTestCafe)) {
    return new axeTestCafe()
  }
  this.t = t
  this._axeOptions = options
  this._context = context
  this._axeSource = axeSource || require('axe-core')
}

axeTestCafe.prototype.analyze = async function (t) {
  const options = this._axeOptions
  const context = isEmpty(this._context) ? null : this._context

  const AXE_SCRIPT = this._axeSource.source
  const hasAxe = ClientFunction(() => !!(window.axe && window.axe.run))
  const injectAxe = ClientFunction(() => eval(AXE_SCRIPT), {
    dependencies: { AXE_SCRIPT }
  })
  const hasScript = await hasAxe.with({ boundTestRun: t })()

  if (!hasScript) {
    await injectAxe.with({ boundTestRun: t })()
  }

  try {
    return await AxeRunner.with({ boundTestRun: t })(context, options)
  } catch (e) {
    return { error: e }
  }
}

axeTestCafe.prototype.withScript = function (axeSource) {
  this._axeSource = scriptBuilder.buildAxeDevtoolsSource({ source: axeSource })
  return this
}

axeTestCafe.prototype.ruleSet = function (ruleID) {
  let rules = []
  if (ruleID === 'wcag21') {
    rules = ['wcag2aa', 'wcag2a', 'wcag21aa', 'wcag21a']
  } else if (ruleID === 'wcag2a') {
    rules = ['wcag2a', 'wcag2aa']
  } else if (ruleID === '508') {
    rules = ['section508']
  }
  const ruleConfig = {
    runOnly: {
      type: 'tag',
      values: rules
    }
  }
  Object.entries(ruleConfig).forEach(([key, value]) => {
    this._axeOptions[key] = value
  })
  return this
}

axeTestCafe.prototype.exclude = function (selector) {
  const excluding = {
    exclude: [[selector]]
  }
  Object.entries(excluding).forEach(([key, value]) => {
    this._context[key] = value
  })
  return this
}

axeTestCafe.prototype.include = function (selector) {
  const including = {
    include: [[selector]]
  }
  Object.entries(including).forEach(([key, value]) => {
    this._context[key] = value
  })
  return this
}

axeTestCafe.prototype.disableRules = function (rules) {
  rules = Array.isArray(rules) ? rules : [rules]
  this._axeOptions = this._axeOptions || {}
  this._axeOptions.rules = {}

  rules.forEach(
    function (rulesConfiguration, ruleToDisable) {
      rulesConfiguration[ruleToDisable] = {
        enabled: false
      }
    }.bind(null, this._axeOptions.rules)
  )
  return this
}

const AxeRunner = ClientFunction((context, options = {}) => {
  return new Promise(resolve => {
    axe.run(context || document, options, (error, result) => {
      resolve(result)
    })
  })
})

function isEmpty(value) {
  return (
    Boolean(value && typeof value === 'object') && !Object.keys(value).length
  )
}

exports = module.exports = axeTestCafe

// TypeScript/ES6 module support (see #74).
export default axeTestCafe
