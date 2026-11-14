import { useContext } from "react";
import { MembersContext } from "../../Context/MembersContext/MembersContext";
import "./MembersList.css";

export const MembersList = () => {
    const { currentWorkspaceMembers } = useContext(MembersContext);

    return (
        <>
        <h4>Miembros</h4>
        <ul className="members-list">
            {currentWorkspaceMembers.map((member) => (
                <li key={member._id} className="members-list-item">
                    <span>{member.id_user.userName}</span>
                    
                </li>
            ))}
        </ul>
        </>
    );
};
