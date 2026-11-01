import React from 'react'
import { Route, Routes } from 'react-router'
import HomeScreen from './screens/HomeScreen/HomeScreen'
import LoginScreen from './screens/LoginScreen/LoginScreen'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import { UserProvider } from './Context/UserProvider'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen/ForgotPasswordScreen'
import WorkspaceScreen from './screens/WorkspaceScreen/WorspaceScreen'
import UserValidationScreen from './screens/UserValidationScreen/UserValidationScreen'

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
        <Route path='/workspace' element={<WorkspaceScreen />} />
        <Route path='/auth/verify-email/:token' element={<UserValidationScreen />} />
      </Routes>
    </UserProvider>
  )
}


export default App
