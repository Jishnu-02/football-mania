import '../styles/globals.css'

import { AuthContextProvider } from "../stores/authContext";
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default MyApp
