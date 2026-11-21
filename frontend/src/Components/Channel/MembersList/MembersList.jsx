import { useContext } from "react";
import { Link, useParams } from "react-router";
import { MembersContext } from "../../../Context/MembersContext/MembersContext";
import { capitalizeFirstLetter } from "../../../hooks/useCapitalize.js";
import "./MembersList.css";

export const MembersList = () => {
    const { workspace_id, user_id } = useParams();
    const { currentWorkspaceMembers } = useContext(MembersContext);

    return (
        <section className="members-section" aria-label="Miembros del espacio de trabajo">
            <h4 className="members-list-title">Miembros</h4>
            <ul className="members-list">
                {currentWorkspaceMembers.map((member) => {
                    const memberUserId = member.id_user?._id;
                    const isActive = memberUserId && memberUserId === user_id;

                    return (
                        <li key={member._id} className="members-list-item">
                            <Link
                                to={`/workspaces/${workspace_id}/MessagesPrivate/${memberUserId}/messages`}
                                className={`members-list-link ${isActive ? "is-active" : ""}`}
                            >
                                <span className="members-list-status-dot" aria-hidden="true" />
                                <span>{capitalizeFirstLetter(member.id_user?.userName)}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};
