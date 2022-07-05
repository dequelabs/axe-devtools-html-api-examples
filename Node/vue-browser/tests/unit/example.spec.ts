import { mount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import axeDevtools from '@axe-devtools/browser';
import Reporter from '@axe-devtools/reporter'


const fixture = document.createElement('div');

describe('HelloWorld.vue', () => {
  let reporter;
  
  beforeEach(() => {
    document.body.appendChild(fixture);
    reporter = new Reporter('A11yResults', './a11y-results')
    })

  afterEach(() => {
    reporter.buildHTML('./a11y-results')
    reporter.buildCSV('./a11y-results')
    reporter.buildJUnitXML('./a11y-results')
    document.body.removeChild(fixture);
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
