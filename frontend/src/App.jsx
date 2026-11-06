import React from "react";
import { Route, Routes } from "react-router";
import { HomeScreen } from "./screens/HomeScreen/HomeScreen";
import { LoginScreen } from "./screens/LoginScreen/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen/RegisterScreen";
import { ResetPasswordScreen } from "./screens/ResetPasswordScreen/ResetPasswordScreen";
import { UserProvider } from "./Context/UserProvider";
import { WorkspaceScreen } from "./screens/WorkspaceScreen/WorkspaceScreen";
import { UserValidationScreen } from "./screens/UserValidationScreen/UserValidationScreen";
import { ChannelLayout } from "./Layout/ChannelLayout";
import { MessagesChannelScreen } from "./screens/MessagesChannelScreen/MessagesChannelScreen";
import { Navigate } from "react-router";
import { MessagesChannelDefaultScreen } from "./screens/MessagesChannelDefault/MessagesChannelDefault";
import { AuthMiddleware } from "./middleware/authMiddleware";
import { WorkspaceProvider } from "./Context/WorkspaceProvider";
import { ChannelProvider } from "./Context/ChannelProvider";
import { MessagesProvider } from "./Context/MessagesProvider";

const App = () => {
  return (
    <UserProvider>
      <WorkspaceProvider>
        <ChannelProvider>
          <MessagesProvider>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/auth/reset-password" element={<ResetPasswordScreen />} />
              <Route path="/auth/verify-email/:token" element={<UserValidationScreen />}/>
              <Route element={<AuthMiddleware />}>
                  <Route path="/workspaces" element={<WorkspaceScreen />} />
                  <Route path="/workspaces/:workspace_id/channels" element={<ChannelLayout />}>
                      <Route index element={<MessagesChannelDefaultScreen />} />
                      <Route path=":channel_id/messages" element={<MessagesChannelScreen />}/>
                  </Route>
              </Route>
              {/* Redirección por defecto si la ruta no existe */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MessagesProvider>
        </ChannelProvider>
      </WorkspaceProvider>
    </UserProvider>
  );
};

export default App;
