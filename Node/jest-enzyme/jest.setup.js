const Enzyme = require('enzyme')
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17')
require('canvas')

Enzyme.configure({ adapter: new Adapter() })
