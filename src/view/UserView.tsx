import "./UserView.css";
import {RootState} from "@/store";
import {useSelector} from "react-redux";
import {EnrollmentService} from "@/service/EnrollmentService.ts";
import {BootcampService} from "@/service/BootcampService.ts";

export default function UserView() {
    const authState = useSelector((state: RootState) => state.auth);
    const baseState = useSelector((state: RootState) => state.base);
    const {data: enrolled} = EnrollmentService.useReadUserEnrollmentQuery();
    const enrolledBootcamps = enrolled?.data;
    const {data: saved} = BootcampService.useReadSavedBootcampQuery();
    const savedBootcamps = saved?.data;

    const getDays = (date: string) => {
        console.log(date);
        const today = new Date();
        const created = new Date(date);
        const diff = today.getTime() - created.getTime();
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        if (days === 0) return "Today";
        if (days === 1) return "Yesterday";
        if (days < 7) return `${days} days ago`;
        if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
        return `${Math.floor(days / 30)} months ago`;
    }


    return (
        <div className="userView">

            {/* Sidebar */}
            {/*<aside className="sidebar">*/}
            {/*    /!*<div className="logo">BootcampHub</div>*!/*/}

            {/*    <nav className="nav">*/}
            {/*        <NavItem label="Dashboard" active/>*/}
            {/*        <NavItem label="Enrolled Bootcamps"/>*/}
            {/*        <NavItem label="Saved Bootcamps"/>*/}
            {/*        <NavItem label="Reviews"/>*/}
            {/*        <NavItem label="Settings"/>*/}
            {/*    </nav>*/}

            {/*    <div className="logout">Logout</div>*/}
            {/*</aside>*/}

            <main className="main">
                <section className="userHero">
                    <div>
                        <h1>Welcome back, {authState.userInfo?.name} 👋</h1>
                        <p>Continue building your software engineering journey.</p>
                    </div>

                    <div className="userHeroStats">
                        <HeroStat label="Bootcamps" value={String(enrolledBootcamps?.length)}/>
                        <HeroStat label="Courses" value="12"/>
                        <HeroStat label="Completion" value="87%"/>
                    </div>
                </section>

                {/* Quick Stats */}
                <section className="statsGrid">
                    <StatCard title="Saved Bootcamps" value={String(savedBootcamps?.length)}/>
                    <StatCard title="Enrolled Bootcamps" value={String(enrolledBootcamps?.length)}/>
                    <StatCard title="Reviews Written" value="8"/>
                    <StatCard title="Certificates" value="2"/>
                </section>

                {/* Continue Learning */}
                <section>
                    <h2 className="sectionTitle">Continue Learning</h2>

                    <div className="horizontalScroll">
                        {enrolledBootcamps?.map(enrolledBootcamp => {
                            const bootcamp = baseState.bootcamps?.find(item => item.id == enrolledBootcamp.bootcamp);
                            return (
                                <div className="courseCard" key={bootcamp?.id}>
                                    <div className="courseImage">
                                        <img src={"/images/bootcamp.png"} alt={"no image"} className={"heroImage"}
                                             style={{borderRadius: "0"}}/>
                                    </div>

                                    <h3>{bootcamp?.name}</h3>
                                    <p>68% Complete</p>

                                    <div className="progressBar">
                                        <div className="progressFill"/>
                                    </div>

                                    <button className="primaryBtn">Continue Learning →</button>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* Saved Bootcamps */}
                <section>
                    <h2 className="sectionTitle">Saved Bootcamps</h2>

                    <div className="savedGrid">
                        {savedBootcamps?.map(savedBootcamp => {
                            const bootcamp = baseState.bootcamps?.find(item => item.id == savedBootcamp.bootcamp);
                            return (
                                <div className="savedCard" key={bootcamp?.id}>
                                    <div>
                                        <span className="tag">❤️ Saved</span>
                                        <h3>{bootcamp?.name}</h3>
                                        <p>Added {getDays(savedBootcamp!.createdAt)}</p>
                                    </div>

                                    <button className="primaryBtn">Enroll</button>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* Recommended */}
                <section>
                    <h2 className="sectionTitle">Recommended For You</h2>

                    <div className="recommendedGrid">
                        {[1, 2, 3].map(i => (
                            <div className="recCard" key={i}>
                                <div className="recImage"/>
                                <h3>Data Science Bootcamp</h3>
                                <p>Based on your interests</p>
                                <button className="linkBtn">View Details →</button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Activity */}
                <section>
                    <h2 className="sectionTitle">Recent Activity</h2>

                    <div className="activityBox">
                        <p>You enrolled in Backend Engineering</p>
                        <p>You saved Data Science Bootcamp</p>
                        <p>You reviewed React Accelerator</p>
                    </div>
                </section>

            </main>
        </div>
    );
}


// function NavItem({label, active}: { label: string, active?: boolean }) {
//     return (
//         <div className={`navItem ${active ? "active" : ""}`}>
//             {label}
//         </div>
//     );
// }

function HeroStat({label, value}: { label: string, value: string }) {
    return (
        <div className="userHeroStat">
            <strong>{value}</strong>
            <span>{label}</span>
        </div>
    );
}

function StatCard({title, value}: { title: string, value: string }) {
    return (
        <div className="statCard">
            <p>{title}</p>
            <h3>{value}</h3>
        </div>
    );
}