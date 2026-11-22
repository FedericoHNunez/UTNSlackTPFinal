import React from "react";
import { Route, Routes } from "react-router";
import { HomeScreen } from "./screens/HomeScreen/HomeScreen";
import { LoginScreen } from "./screens/LoginScreen/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen/RegisterScreen";
import { ResetPasswordScreen } from "./screens/ResetPasswordScreen/ResetPasswordScreen";
import { UserProvider } from "./Context/UserContext/UserProvider";
import { WorkspaceScreen } from "./screens/WorkspaceScreen/WorkspaceScreen";
import { UserValidationScreen } from "./screens/UserValidationScreen/UserValidationScreen";
import { ChannelLayout } from "./Layout/ChannelLayout/ChannelLayout";
import { MessagesPrivateLayout } from "./Layout/DirectMessagesLayout/DirectMessagesLayout";
import { MessagesChannelScreen } from "./screens/MessagesChannelScreen/MessagesChannelScreen";
import { Navigate } from "react-router";
import { MessagesChannelDefaultScreen } from "./screens/MessagesChannelDefault/MessagesChannelDefault";
import { MessagesPrivateDefaultScreen } from "./screens/MessagesPrivateDefault/MessagesPrivateDefault";
import { AuthMiddleware } from "./middleware/authMiddleware";
import { WorkspaceProvider } from "./Context/WorkspaceContext/WorkspaceProvider";
import { MembersProvider } from "./Context/MembersContext/MembersProvider";
import { ChannelProvider } from "./Context/ChannelContext/ChannelProvider";
import { MessagesProvider } from "./Context/MessagesContext/MessagesProvider";
import { DirectMessagesProvider } from "./Context/DirectMessagesContext/DirectMessagesProvider";
import { NavLayout } from "./Layout/MainLayout/MainLayout";
import { InvitationWorkspaceScreen } from "./screens/InvitationWorkspaceScreen/InvitationWorkspaceScreen";
import { DirectMessagesScreen } from "./screens/MessagesPrivateScreen/DirectMessagesScreen";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/workspaces/:workspace_id/members/accept-invite/:token" element={<InvitationWorkspaceScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/auth/reset-password" element={<ResetPasswordScreen />} />
        <Route path="/auth/verify-email/:token" element={<UserValidationScreen />} />
        <Route element={<AuthMiddleware />}>
          <Route element={<WorkspaceProvider />}>
            <Route path="/workspaces" element={<WorkspaceScreen />} />
            <Route path="/workspaces/:workspace_id/" element={<NavLayout />}>
              <Route element={<MembersProvider />}>
                <Route element={<ChannelProvider />}>
                  <Route path="/workspaces/:workspace_id/channels" element={<ChannelLayout />}>
                    <Route index element={<MessagesChannelDefaultScreen />} />
                    <Route element={<MessagesProvider />}>
                      <Route path=":channel_id/messages" element={<MessagesChannelScreen />} />
                    </Route>
                  </Route>
                  <Route element={<DirectMessagesProvider />}>
                    <Route path="/workspaces/:workspace_id/MessagesPrivate" element={<MessagesPrivateLayout />}>
                      <Route index element={<MessagesPrivateDefaultScreen />} />
                      <Route path=":user_id/messages" element={<DirectMessagesScreen />} />
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        {/* Redirección por defecto si la ruta no existe */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UserProvider>
  );
};

export default App;
