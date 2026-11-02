import React from 'react'
import { Route, Routes } from 'react-router'
import { HomeScreen } from './screens/HomeScreen/HomeScreen'
import { LoginScreen } from './screens/LoginScreen/LoginScreen'
import { RegisterScreen } from './screens/RegisterScreen/RegisterScreen'
import { UserProvider } from './Context/UserProvider'
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen/ForgotPasswordScreen'
import { WorkspaceScreen } from './screens/WorkspaceScreen/WorspaceScreen'
import { UserValidationScreen } from './screens/UserValidationScreen/UserValidationScreen'
import { ChannelLayout } from './Layout/ChannelLayout'
import { MessagesChannelScreen } from './screens/MessagesChannelScreen/MessagesChannelScreen'
import { Navigate } from 'react-router'
import { MessagesChannelDefaultScreen } from './screens/MessagesChannelDefault/MessagesChannelDefault'

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
        <Route path='/workspaces' element={<WorkspaceScreen />} />
        <Route path='/auth/verify-email/:token' element={<UserValidationScreen />} />
        <Route path='/workspaces/:workspace_id/channels' element={<ChannelLayout />}>
          <Route index element={<MessagesChannelDefaultScreen />} />
          <Route path=':channel_id/messages' element={<MessagesChannelScreen />} />
        </Route>
        {/* Redirección por defecto si la ruta no existe */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UserProvider>
  )
}


export default App
