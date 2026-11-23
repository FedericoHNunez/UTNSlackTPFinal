import { useContext } from "react";
import { Link, useParams } from "react-router";
import { MembersContext } from "../../../Context/MembersContext/MembersContext";
import { UserContext } from "../../../Context/UserContext/UserContext";
import { capitalizeFirstLetter } from "../../../hooks/useCapitalize.js";
import { getAvatarColor } from "../../../constants/avatarConstants.js";
import "./MembersList.css";

export const MembersList = () => {
    const { workspace_id, user_id } = useParams();
    const { currentWorkspaceMembers } = useContext(MembersContext);
    const { userData } = useContext(UserContext);

    return (
        <section className="members-section" aria-label="Miembros del espacio de trabajo">
            <h4 className="members-list-title">Miembros</h4>
            <ul className="members-list">
                {currentWorkspaceMembers.map((member, index) => {
                    const memberUserId = member.id_user?._id;
                    const memberUserName = member.id_user?.userName || "Usuario";
                    const isActive = memberUserId && memberUserId === user_id;
                    const isCurrentUser =
                        (userData?._id && memberUserId === userData._id) ||
                        (userData?.id && memberUserId === userData.id) ||
                        (userData?.userName && memberUserName === userData.userName);
                    const avatarColor = getAvatarColor(
                        memberUserId || memberUserName,
                        index
                    );

                    return (
                        <li key={member._id} className="members-list-item">
                            <Link
                                to={`/workspaces/${workspace_id}/MessagesPrivate/${memberUserId}/messages`}
                                className={`members-list-link ${isActive ? "is-active" : ""}`}
                            >
                                <span className="members-list-avatar" aria-hidden="true">
                                    <svg
                                        viewBox="0 0 36 36"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            width="36"
                                            height="36"
                                            rx="8"
                                            fill={avatarColor}
                                        />
                                        <circle
                                            cx="18"
                                            cy="13.5"
                                            r="6"
                                            fill="#FFFFFF"
                                        />
                                        <path
                                            d="M6 34C6 27.3726 11.3726 22 18 22C24.6274 22 30 27.3726 30 34V36H6V34Z"
                                            fill="#FFFFFF"
                                        />
                                    </svg>
                                    <span className="members-list-status-dot" />
                                </span>

                                <span className="members-list-name">
                                    {capitalizeFirstLetter(memberUserName)}
                                </span>

                                {isCurrentUser && (
                                    <span className="members-list-you">tú</span>
                                )}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};
