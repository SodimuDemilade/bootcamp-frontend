import {useEffect, useState} from "react";
import "./AdminView.css";
import {User} from "@/model/response/user/ReadUserResponse.ts";
import {UserService} from "@/service/UserService.ts";
import {UsersSection} from "@/component/ui/content/UsersSection.tsx";
import {UserModal} from "@/component/ui/modal/UserModal.tsx";

export type AdminSection = "users" | "bootcamps";

export function AdminUsersView() {
    const {data: initialUsers, isLoading} = UserService.useReadUserQuery();
    const [deleteUser] = UserService.useDeleteUserMutation();
    const [users, setUsers] = useState<User[]>([]);
    const [showUserModal, setShowUserModal] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    useEffect(() => {
        if (initialUsers?.data) setUsers(initialUsers.data);
    }, [initialUsers])

    const openEditModal = (user: User) => {
        setEditingUser(user);
        setShowUserModal(true);
    };

    const deleteUserAction = async (id: string) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (confirmDelete) {
            await deleteUser(id);
            setUsers((prev) => prev.filter((user) => user._id !== id));
        }
    };


    return (
        <>
            <UsersSection
                users={users}
                isLoading={isLoading}
                onCreate={() => setShowUserModal(true)}
                onEdit={openEditModal}
                onDelete={deleteUserAction}
            />

            {showUserModal && (
                <UserModal
                    editingUser={editingUser}
                    onClose={() => setShowUserModal(false)}
                    setUsers={setUsers}
                />
            )}
        </>
    );
}