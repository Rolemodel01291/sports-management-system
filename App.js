import React from 'react';
import Root from './src/Root'
import { Provider } from 'react-redux';

// import Counter from './screens/Counter';

import { store } from './src/store/store';

class App extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <Root />
      </Provider>      
    )
  }  
};

export default App;
