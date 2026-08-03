import "../../public/css/dashboard.css";
import {Check, Plus, TrendingUp} from "lucide-react";
import {Rating} from "../component/ui/rating.tsx";
import {FeaturedCard} from "../component/ui/card/FeaturedCard.tsx";
import {categories} from "../util/constants/data/CategoriesData.ts";
import {CategoryCard} from "../component/ui/card/CategoryCard.tsx";
import {Testimonials} from "../util/constants/data/TestimonialData.ts";
import {TestimonialCard} from "../component/ui/card/TestimonialCard.tsx";
import {RouteConstant} from "../util/constants/routeConstant.ts";
import {useNavigate} from "react-router-dom";
import {BootcampService} from "@/service/BootcampService.ts";


export const LandingView = () => {
    const navigate = useNavigate();
    const {data} = BootcampService.useReadBootcampQuery();
    const bootcamps = data?.data;

    const sortedBootcamps = [...(bootcamps ?? [])].sort(
        (a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0)
    );

    const goToBootcamps = () => {
        navigate(RouteConstant.dashboard.bootcampList.path)
    }

    // const allUsers = ["John", "Jane", "Mike"];
    // const [users, setUsers] = useState(["John", "Jane", "Mike"]);
    // const [input, setInput] = useState("");
    // const [debounced, setDebounced] = useState("");
    // const [tasks, setTasks] = useState<Task[]>([]);
    // const [count, setCount] = useState(1);
    // const [task, setTask] = useState("");
    // const [loading, setLoading] = useState(false);
    //
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setDebounced(input);
    //     }, 500);
    //
    //     return () => clearTimeout(timeout);
    // }, [input]);
    //
    // useEffect(() => {
    //     if (debounced) {
    //         setUsers(allUsers.filter(user => user.toLowerCase().includes(input.toLowerCase())));
    //     } else {
    //         setUsers(allUsers);
    //     }
    // }, [debounced]);
    //
    // const addTask = (taskName: string) => {
    //     setTasks((prev) => [...prev, {id: count, name: taskName, status: "completed"}]);
    //     setCount((prev) => prev + 1);
    // }
    //
    // const removeTask = (taskId: number) => {
    //     setTasks((prev) => prev.filter(task => task.id != taskId));
    // }
    //
    // const checkTask = (checked: boolean, taskId: number) => {
    //     const state = checked ? "completed" : "pending";
    //     setTasks((prev) => {
    //         return prev.map((task) => {
    //             return task.id == taskId ? {...task, status: state} : task
    //         })
    //     })
    // }
    //
    // const fetchData = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await fetch("https://usersdata.com");
    //         if (!response.ok) {
    //             throw new Error("Failed to fetch data");
    //         }
    //         const data = await response.json();
    //         console.log(data);
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }


    return (
        <div className={"mainContent"}>
            {/*<div>*/}
            {/*    <input value={input} onChange={(e) => setInput(e.target.value)}/>*/}
            {/*    {users.map((user) => (*/}
            {/*        <p>{user}</p>*/}
            {/*    ))}*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <input value={task} onChange={(e) => setTask(e.target.value)}/>*/}
            {/*    <button onClick={() => addTask(task)}>Add task</button>*/}
            {/*    {tasks.map((task) => (*/}
            {/*        <div style={{display: "flex", gap: '5px'}}>*/}
            {/*            <p>{task.name}</p>*/}
            {/*            <input type={"checkbox"} checked={task.status === "completed"}*/}
            {/*                   onChange={(e) => checkTask(e.target.checked, task.id)}/>*/}
            {/*            <button onClick={() => removeTask(task.id)}>Remove</button>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <button onClick={() => fetchData()}>Fetch data</button>*/}
            {/*</div>*/}
            <section className={"hero"}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px'}}>
                    <div className={"heroTag"}>
                        <div className={"tagBullet"}></div>
                        <p>New: AI & Machine Learning bootcamp just launched</p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                        <p className={"heroBigText"}>Find the Right Bootcamp for Your Career.</p>
                        <p className={"heroSubText"}>Discover top-rated coding bootcamps, compare programs, and read
                            verified reviews.</p>
                    </div>
                    <div>
                        <p>Intensive, project-based bootcamps taught by engineers who've<br/>done it. Go from zero
                            to
                            portfolio-ready in weeks.</p>
                    </div>
                    <div className={"header-right"}>
                        <button className={"button signUp"}>Get Started</button>
                        <button className={"button logIn"} onClick={goToBootcamps}>Explore Bootcamps
                        </button>
                    </div>
                    <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                        <Rating rating={4.9} fill={"#4F46E5"} color={"#4F46E5"}/>
                        <p>4.9 Rated by 2400+ students</p>
                    </div>
                </div>
                <div className={"heroCards"}>
                    <div className={"heroCard"}>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                            <p className={"heroCardText"}>14K+</p>
                            <p>Students enrolled<br/>this year</p>
                        </div>
                        <div className={"cardTag"}>
                            <TrendingUp/>
                            <p>Up 32% since last<br/>year</p>
                        </div>
                    </div>
                    <div className={"heroCard"}>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                            <p className={"heroCardText"}>48</p>
                            <p>Bootcamps &<br/>courses available</p>
                        </div>
                        <div className={"cardTag"}>
                            <Plus/>
                            <p>6 new added this<br/>month</p>
                        </div>
                    </div>
                    <div className={"heroCard"}>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                            <p className={"heroCardText"}>89%</p>
                            <p>Job placement<br/>within 3 months</p>
                        </div>
                        <div className={"cardTag"}>
                            <Check/>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%',
                                    justifyContent: 'center',
                                }}>
                                <p style={{textAlign: 'center'}}>Verified<br/>Outcomes</p>
                            </div>
                        </div>
                    </div>
                    <div className={"heroCard"}>
                        <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                            <p className={"heroCardText"}>8 wks</p>
                            <p>Average time to<br/>first job offer</p>
                        </div>
                        <div className={"cardTag"}>
                            <Check/>
                            <p>Career support<br/>included</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={"featured"}>
                <div className={"featuredTop"}>
                    <p className={"sectionTitle"}>FEATURED</p>
                    <p className={"sectionSubtitle"}>Top bootcamps right now</p>
                    <p style={{fontSize: '16px'}}>Hand-picked programs with the highest completion and hire
                        rates.</p>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'right',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        color: "#06B6D4"
                    }}>
                        <p onClick={goToBootcamps}>See all bootcamps -{">"}</p>
                    </div>
                    <div className={"featuredCards"}>
                        {
                            sortedBootcamps.slice(0, 4).map((item, index) => {
                                return (
                                    <FeaturedCard {...item} key={index}/>
                                )
                            })
                        }
                    </div>
                </div>
            </section>

            <section className={"featured"} style={{background: "#F8FAFC"}}>
                <div className={"featuredTop"} style={{textAlign: 'center'}}>
                    <p className={"sectionTitle"} style={{color: "#4F46E5"}}>BROWSE</p>
                    <p className={"sectionSubtitle"} style={{color: "#06B6D4"}}>Course Categories</p>
                    <p style={{fontSize: '16px'}}>Find the track that fits your goals. Every category has self-paced
                        courses and live
                        bootcamps.</p>
                </div>
                <div className={"featuredCards"}>
                    {categories.map((category, index) => (
                        <CategoryCard {...category} key={index}/>
                    ))}
                </div>
            </section>

            <section className={"featured"}>
                <div className={"featuredTop"}>
                    <p className={"sectionTitle"}>TESTIMONIALS</p>
                    <p className={"sectionSubtitle"}>Hear from our graduates</p>
                    <p style={{fontSize: '16px'}}>Real outcomes. Real people. No fluff.</p>
                </div>
                <div className={"featuredCards"} style={{gridTemplateColumns: "repeat(2, 1fr)"}}>
                    {Testimonials.map((testimonial, index) => (
                        <TestimonialCard {...testimonial} key={index}/>
                    ))}
                </div>
            </section>
        </div>
    )
}