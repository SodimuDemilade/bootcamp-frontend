import {User} from "@/model/response/user/ReadUserResponse.ts";
import {MetricCard} from "@/component/ui/card/MetricCard.tsx";
import {useEffect, useState} from "react";

type UsersSectionProps = {
    users: User[];
    isLoading: boolean;
    onCreate: () => void;
    onEdit: (user: User) => void;
    onDelete: (userId: string) => void;
}

export const UsersSection = ({
                                 users,
                                 isLoading,
                                 onCreate,
                                 onEdit,
                                 onDelete,
                             }: UsersSectionProps) => {

    const [allUsers, setUsers] = useState<User[]>(users);
    const [searchValue, setSearchValue] = useState("");
    const oneMonthAgo = (date: string) => {
        const inputDate = new Date(date.split("T")[0]);
        const today = new Date();
        const monthAgo = new Date();
        monthAgo.setMonth(today.getMonth() - 1);
        return inputDate >= monthAgo;
    }

    useEffect(() => {
        if (users) setUsers(users);
    }, [users]);

    useEffect(() => {
        if (searchValue === "") setUsers(users);
        else setUsers(allUsers.filter(user => user.name.toLowerCase().includes(searchValue.toLowerCase())));
    }, [searchValue]);

    return (
        <section className="adminSection">
            <div className="topbar">
                <div>
                    <h2>Users</h2>
                    <p>Manage all platform users and their access roles.</p>
                </div>

                <button className="primaryBtn" onClick={onCreate}>
                    + Create User
                </button>
            </div>

            <div className="metricsGrid">
                <MetricCard
                    title="Total Users"
                    value={allUsers.length}
                />

                <MetricCard
                    title="Publishers"
                    value={
                        allUsers.filter(user => user.role === "publisher").length
                    }
                />

                <MetricCard
                    title="New Users"
                    value={
                        allUsers.filter(user => oneMonthAgo(user.createdAt)).length
                    }
                />

                <MetricCard
                    title="Admins"
                    value={
                        allUsers.filter(user => user.role === "admin").length
                    }
                />
            </div>

            <div className="tableContainer">
                <div className="tableHeader">
                    <div>
                        <h3>All Users</h3>
                        <p>{allUsers.length} registered accounts</p>
                    </div>

                    <input
                        type="search"
                        placeholder="Search users..."
                        className="searchInput"
                        value={searchValue}
                        onChange={(e) => {
                            setSearchValue(e.target.value)
                        }}
                    />
                </div>

                <div className={"usersTable"}>
                    <table className="usersTable">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={4}>
                                    <div className="tableLoading">
                                        Loading users...
                                    </div>
                                </td>
                            </tr>
                        ) : allUsers.length === 0 ? (
                            <tr>
                                <td colSpan={4}>
                                    <div className="tableEmptyState">
                                        <h4>No users found</h4>
                                        <p>
                                            User accounts will appear here once
                                            they are created.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            allUsers.map(user => (
                                <tr key={user._id}>
                                    <td>
                                        <div className="userInfo">
                                            <div className="avatar">
                                                {user.name.charAt(0)}
                                            </div>

                                            {user.name}
                                        </div>
                                    </td>

                                    <td>{user.email}</td>

                                    <td>
                                        <span
                                            className={`roleBadge ${user.role.toLowerCase()}`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>

                                    <td>
                                        <div className="actions">
                                            <button
                                                className="editBtn"
                                                onClick={() => onEdit(user)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="deleteBtn"
                                                onClick={() =>
                                                    onDelete(user._id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};