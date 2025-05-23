import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './Redux/Store.jsx'



createRoot(document.getElementById('root')).render(
<PersistGate persistor={persistor} >
  <Provider store={store}>
         <App />
  </Provider>
</PersistGate>
)
