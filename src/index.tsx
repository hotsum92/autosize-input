import React from 'react'
import * as ReactDOMClient from 'react-dom/client';
import App from '~/ui/app'

const container = document.getElementById('root');

if(container == null) {
  throw Error('cannot find root container')
} else {
  const root = ReactDOMClient.createRoot(container);

  root.render(<App />)
}

