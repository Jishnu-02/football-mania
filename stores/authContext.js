import { createContext, useEffect, useState } from 'react'

import netlifyIdentity from 'netlify-identity-widget'

const AuthContext = createContext({ 
    user: null,
    login: () => {},
    logout: () => {},
    authReady: false
 })


 export const AuthContextProvider = ({children}) => {
     const [user, setUser] = useState(null)
     
     useEffect(() => {
         netlifyIdentity.on('login', (user) =>{
             setUser(user)
             netlifyIdentity.close()
             console.log('logged in ')
         })

        netlifyIdentity.on('logout', (user) =>{
             setUser(null)
             
             console.log('logged out ')
         })
         
        return () => {
            netlifyIdentity.off('login')
            netlifyIdentity.off('logout')
        }

         //init netify identity connection 
         netlifyIdentity.init()
     },[])

     const login = () => {
         netlifyIdentity.open()
     }


     const logout = () => {
         netlifyIdentity.logout()
     }


     const context = { user ,login, logout}
     
     return (
         <AuthContext.Provider value={context }>
         {children}
         </AuthContext.Provider>
     )
 }

 export default AuthContext