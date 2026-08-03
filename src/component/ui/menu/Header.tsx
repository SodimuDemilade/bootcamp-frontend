import {RouteConstant} from "@/util/constants/routeConstant";
import {useNavigate} from "react-router-dom";
import {authStore} from "@/store/authStore";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store";
import {AppDispatch} from "@/configs/storeConfig";
import {LayoutDashboard} from "lucide-react";

export const Header = () => {
    const authState = useSelector((state: RootState) => state.auth);

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const handleDashboardNavigation = () => {
        switch (authState.userInfo.role) {
            case "user":
                navigate(RouteConstant.dashboard.user.path);
                break;

            case "publisher":
                navigate(RouteConstant.dashboard.publisher.path);
                break;

            case "admin":
                navigate(RouteConstant.dashboard.adminUsers.path);
                break;

            default:
                navigate(RouteConstant.dashboard.landing.path);
        }
    };

    return (
        <div className="header">
            <div className="header-left">
                <h1 onClick={() => navigate(RouteConstant.dashboard.landing.path)}>
                    BootcampHub
                </h1>
            </div>

            <div className="header-right">
                {authState.token ? (
                    <>
                        <button
                            className="button dashboardButton"
                            onClick={handleDashboardNavigation}
                        >
                            <LayoutDashboard size={18}/>
                            Dashboard
                        </button>

                        <button
                            className="button logIn"
                            onClick={() => {
                                dispatch(authStore.action.logout());
                                navigate(RouteConstant.auth.login.path);
                            }}
                        >
                            Log Out
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="button signUp"
                            onClick={() => navigate(RouteConstant.auth.signup.path)}
                        >
                            Sign Up
                        </button>

                        <button
                            className="button logIn"
                            onClick={() => navigate(RouteConstant.auth.login.path)}
                        >
                            Log In
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};