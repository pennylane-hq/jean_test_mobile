// Solving TS issue using old way import
// https://github.com/infinitered/reactotron/issues/1430#issuecomment-2180872830
const Reactotron = require('reactotron-react-native').default

Reactotron.configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect() // let's connect!
