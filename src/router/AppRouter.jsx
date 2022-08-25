import { async } from "@firebase/util"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { useCheckAuth } from "../hooks"
import { JournalRoutes } from "../journal/routes/JournalRoutes"
import CheckingAuth from "../ui/components/CheckingAuth"

export const AppRouter = () => {

  const status  = useCheckAuth();

  if( status === 'checking'){
    return <CheckingAuth />
  }
  return (
    
    <Routes>
      {
        ( status === 'authenticated' )
        ? <Route  path="/*" element= {<JournalRoutes />}/>
        : <Route  path="/auth/*" element= {<AuthRoutes />}/>
      } 
      <Route path="/*"  element={<Navigate to={'/auth/login'} /> } />
    </Routes>
  )
}
