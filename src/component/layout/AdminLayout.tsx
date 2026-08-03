import "../../view/AdminView.css";
import {NavLink, Outlet} from "react-router";

export type AdminSection = "users" | "bootcamps";

export function AdminLayout() {
    return (
        <div className="adminDashboard">
            <main className="adminMainContent">
                <div className="adminPageHeading">
                    <div>
                        <p className="adminEyebrow">Administration</p>
                        {/*<h3>Platform Management</h3>*/}
                        <p>Manage users, publishers and bootcamps across the platform.</p>
                    </div>
                </div>

                {/*<div className="adminTabs">*/}
                {/*    <button*/}
                {/*        type="button"*/}
                {/*        className={*/}
                {/*            activeSection === "users"*/}
                {/*                ? "adminTab active"*/}
                {/*                : "adminTab"*/}
                {/*        }*/}
                {/*        onClick={() => setActiveSection("users")}*/}
                {/*    >*/}
                {/*        Users*/}
                {/*        <span>{users.length}</span>*/}
                {/*    </button>*/}

                {/*    <button*/}
                {/*        type="button"*/}
                {/*        className={*/}
                {/*            activeSection === "bootcamps"*/}
                {/*                ? "adminTab active"*/}
                {/*                : "adminTab"*/}
                {/*        }*/}
                {/*        onClick={() => setActiveSection("bootcamps")}*/}
                {/*    >*/}
                {/*        Bootcamps*/}
                {/*        <span>{bootcamps.length}</span>*/}
                {/*    </button>*/}
                {/*</div>*/}

                <nav className="adminTabs">
                    <NavLink
                        to="/admin/users"
                        className={({isActive}) =>
                            isActive
                                ? "adminTab active"
                                : "adminTab"
                        }
                    >
                        Users
                    </NavLink>

                    <NavLink
                        to="/admin/bootcamps"
                        className={({isActive}) =>
                            isActive
                                ? "adminTab active"
                                : "adminTab"
                        }
                    >
                        Bootcamps
                    </NavLink>
                </nav>

                <main>
                    <Outlet/>
                </main>
            </main>
        </div>
    );
}