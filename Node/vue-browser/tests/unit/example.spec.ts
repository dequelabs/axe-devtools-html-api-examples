import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import axeDevtools from '@axe-devtools/browser';
import Reporter from '@axe-devtools/reporter'
import rimraf from 'rimraf'

const fixture = document.createElement('div');
document.body.appendChild(fixture);
// let reporter;
describe('HelloWorld.vue', () => {
  let reporter;
  
  beforeEach(() => {
    rimraf.sync('./a11y-results*')
    reporter = new Reporter('A11yResults', './a11y-results')
    })

  afterEach(() => {
    reporter.buildHTML('./a11y-results')
    reporter.buildCSV('./a11y-results')
    reporter.buildJUnitXML('./a11y-results')
    })

  it('renders props.msg when passed',async () => {
    const msg = 'new message'
    const wrapper = mount(HelloWorld, {
      attachTo: fixture,
      props: { msg }
    })
    const results = await axeDevtools.run(fixture);
    reporter.logTestResult('vue-browser-component', results)
    expect(wrapper.text()).toMatch(msg)
    
  })
})
