import { WorkspaceNavbarDesktop } from "./WorkspaceNavBarDesktop.jsx";
import { WorkspaceNavbarMobile } from "./WorkspaceNavBarMobile.jsx";

export default function WorkspaceNavbar() {
    return (
        <>
            <WorkspaceNavbarDesktop />
            <WorkspaceNavbarMobile />
        </>
    );
}
