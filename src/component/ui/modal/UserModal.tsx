import {useFormik} from "formik";
import {UserService} from "@/service/UserService.ts";
import {User} from "@/model/response/user/ReadUserResponse.ts";
import {BaseButton} from "@/component/ui/input/BaseButton.tsx";
import {CreateUserRequestInit} from "@/model/request/user/CreateUserRequest.ts";
import {UserModalType} from "@/util/type";

export const UserModal = ({editingUser, onClose, setUsers}: UserModalType) => {
    const [updateUser, {isLoading}] = UserService.useUpdateUserMutation();
    const [createUser, {isLoading: isCreateLoading}] = UserService.useCreateUserMutation();
    const [readUser] = UserService.useLazyReadUserQuery();

    const handleSubmit = async (values: any) => {
        if (editingUser) {
            const response = await updateUser({_id: editingUser._id, data: values});
            setUsers((prev: User[]) =>
                prev.map((user) =>
                    user._id === editingUser._id
                        ? (response.data ? response.data.data : {_id: editingUser._id, ...values, createdAt: ""})
                        : user
                )
            );
        } else {
            await createUser(values);
            const response = (await readUser()).data;
            console.log("read", response);
            setUsers(response ? response.data : []);
        }
        onClose();
    }

    const formik = useFormik({
        initialValues: editingUser ? editingUser : CreateUserRequestInit,
        onSubmit: (values) => handleSubmit(values),
    })

    return (
        <div className="modalOverlay">

            <div className="modal">

                <div className="modalHeader">
                    <h2>
                        {editingUser ? "Update User" : "Create User"}
                    </h2>

                    <button onClick={() => onClose()}>✕</button>
                </div>

                <form className="modalForm">

                    <div className="formGroup">
                        <label>Full Name</label>

                        <input
                            type="text"
                            value={formik.values.name}
                            onChange={(e) =>
                                formik.setFieldValue("name", e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="formGroup">
                        <label>Email</label>

                        <input
                            type="email"
                            value={formik.values.email}
                            onChange={(e) =>
                                formik.setFieldValue("email", e.target.value)
                            }
                            required
                        />
                    </div>

                    {
                        !editingUser &&
                        <div className="formGroup">
                            <label>Password</label>

                            <input
                                type="password"
                                value={formik.values.password}
                                onChange={(e) =>
                                    formik.setFieldValue("password", e.target.value)
                                }
                                required
                            />
                        </div>
                    }

                    <div className="formGroup">
                        <label>Role</label>

                        <select
                            value={formik.values.role}
                            onChange={(e) =>
                                formik.setFieldValue("role", e.target.value)
                            }
                        >
                            <option value={"user"}>User</option>
                            <option value={"publisher"}>Publisher</option>
                            <option value={"admin"}>Admin</option>
                        </select>
                    </div>

                    {/*<div className="formGroup">*/}
                    {/*    <label>Status</label>*/}

                    {/*    <select*/}
                    {/*        value={formData.status}*/}
                    {/*        onChange={(e) =>*/}
                    {/*            setFormData({*/}
                    {/*                ...formData,*/}
                    {/*                status: e.target.value,*/}
                    {/*            })*/}
                    {/*        }*/}
                    {/*    >*/}
                    {/*        <option>Active</option>*/}
                    {/*        <option>Pending</option>*/}
                    {/*        <option>Suspended</option>*/}
                    {/*    </select>*/}
                    {/*</div>*/}

                    <div className="modalActions">
                        <button
                            type="button"
                            className="secondaryBtn"
                            onClick={() => onClose()}
                        >
                            Cancel
                        </button>

                        <BaseButton
                            text={editingUser ? "Update User" : "Create User"}
                            onClick={() => formik.handleSubmit()}
                            isLoading={isLoading || isCreateLoading}
                            className="primaryBtn"
                        />
                    </div>

                </form>
            </div>
        </div>
    )
}