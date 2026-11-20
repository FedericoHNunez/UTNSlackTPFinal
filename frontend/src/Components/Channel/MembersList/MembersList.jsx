import { useContext } from "react";
import { MembersContext } from "../../../Context/MembersContext/MembersContext";
import { capitalizeFirstLetter } from "../../../hooks/useCapitalize.js";
import "./MembersList.css";

export const MembersList = () => {
    const { currentWorkspaceMembers } = useContext(MembersContext);

    return (
        <section className="members-section" aria-label="Miembros del espacio de trabajo">
            <h4 className="members-list-title">Miembros</h4>
            <ul className="members-list">
                {currentWorkspaceMembers.map((member) => (
                    <li key={member._id} className="members-list-item">
                        <span className="members-list-status-dot" aria-hidden="true" />
                        <span>{capitalizeFirstLetter(member.id_user.userName)}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
};
