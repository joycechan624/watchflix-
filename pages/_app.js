import 'semantic-ui-css/semantic.min.css'
import AppProvider from '@/utils/provider';
import styles from '@/styles/globals.css';
import App from 'next/app';

function MyApp({ Component, pageProps }) {
  return <AppProvider>
    <Component {...pageProps} />
  </AppProvider>  
}

export default MyApp
