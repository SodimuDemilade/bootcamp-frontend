import {RootState} from "@/store";
import {BookOpen, GraduationCap, Pencil, Star, Trash2, Users,} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {CreateCourseRequest} from "@/model/request/course/CreateCourseRequest.ts";
import {toastUtil} from "@/util/toastUtil.ts";
import {baseStore} from "@/store/baseStore.ts";
import {useState} from "react";
import {CourseService} from "@/service/CourseService.ts";
import {BootcampService} from "@/service/BootcampService.ts";
import {CourseModal} from "@/component/ui/modal/CourseModal.tsx";
import {EnrollmentService} from "@/service/EnrollmentService.ts";
import {ReviewService} from "@/service/ReviewService.ts";
import {skipToken} from "@reduxjs/toolkit/query";
import {StringUtil} from "@/util/stringUtil.ts";
import {BootcampModal} from "@/component/ui/modal/BootcampModal.tsx";
import {UpdateBootcampRequest} from "@/model/request/bootcamp/UpdateBootcampRequest.ts";
import {Course} from "@/model/response/course/CourseResponse.ts";

export const CreatorBootcampPage = ({bootcampId, onBack}: { bootcampId: string, onBack?: () => void }) => {
    const dispatch = useDispatch();
    const authState = useSelector((state: RootState) => state.auth);
    const baseState = useSelector((state: RootState) => state.base);
    const [courseOpen, setCourseOpen] = useState<boolean>(false);
    const [bootcampOpen, setBootcampOpen] = useState<boolean>(false);
    const bootcamp = baseState.bootcamps.find(currentBootcamp => currentBootcamp.id === bootcampId);
    const [createCourse, {isLoading: createCourseLoading}] = CourseService.useCreateCourseMutation();
    const [deleteBootcamp] = BootcampService.useDeleteBootcampMutation();
    const [deleteCourse] = CourseService.useDeleteCourseMutation();
    const [editBootcamp, {isLoading: editBootcampLoading}] = BootcampService.useUpdateBootcampMutation();
    const [editCourse, {isLoading: editCourseLoading}] = CourseService.useUpdateCourseMutation();
    const {data: enrollments} = EnrollmentService.useReadBootcampEnrollmentQuery(bootcamp ? bootcamp.id : "");
    const {data: reviews} = ReviewService.useReadReviewQuery(bootcamp ? bootcamp.id : skipToken);
    const [selectedCourse, setSelectedCourse] = useState<Course>();


    const submitCourse = async (data: CreateCourseRequest) => {
        const response = await createCourse({bootcampId: bootcamp!.id, data});
        if (!response.error) {
            toastUtil.showUniqueToast("Successful Course", "Course Successfully added!", "success");
            dispatch(baseStore.mutation.addCourseToBootcamp({bootcampId: bootcamp!.id, course: response.data!.data}));
        }
    }

    const deleteBootcampAction = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this bootcamp?"
        );

        if (confirmDelete) {
            await deleteBootcamp(bootcamp!.id);
            dispatch(baseStore.mutation.removeBootcamp(bootcamp!.id));
        }
    }

    const deleteCourseAction = async (id: string) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (confirmDelete) {
            await deleteCourse(id);
            dispatch(baseStore.mutation.removeCourseFromBootcamp({bootcampId: bootcamp!.id, courseId: id}));
        }
    }

    const handleBootcampEdit = async (data: UpdateBootcampRequest) => {
        const response = await editBootcamp({id: bootcampId, data});
        if (!response.error) {
            toastUtil.showUniqueToast("Successful Bootcamp", "Bootcamp Successfully updated!", "success");
            dispatch(baseStore.mutation.editBootcamp({bootcamp: response.data.data}));
        }
    }

    const handleEditCourse = async (data: CreateCourseRequest) => {
        const response = await editCourse({courseId: selectedCourse!._id, data});
        if (!response.error) {
            toastUtil.showUniqueToast("Successful Course", "Course Successfully updated!", "success");
            dispatch(baseStore.mutation.editCourse({
                bootcampId: bootcampId,
                courseId: selectedCourse!._id,
                course: response.data.data
            }));
        }
    }


    return (
        <main className="publisherPage">
            <header className="publisherHeader">
                <div>
                    <p className="publisherEyebrow">Publisher dashboard</p>
                    <h1>Welcome back, {authState.userInfo.name}</h1>
                    <p>
                        Manage your bootcamp, courses, enrollments, and reviews.
                    </p>
                </div>

                {onBack &&
                    <button className="viewPublicButton" onClick={onBack}>
                        {/*<Eye size={17}/>*/}
                        Back to List
                    </button>
                }
            </header>

            <section className="publisherBootcampCard">
                <div className="publisherImageWrapper">
                    <img
                        src={"/images/webDev.jpg"}
                        alt={bootcamp!.name}
                        className="publisherBootcampImage"
                    />

                    <span className="publisherStatus">
                        Published
                    </span>
                </div>

                <div className="publisherBootcampContent">
                    <div className="publisherBootcampHeading">
                        <div>
                            <p className="publisherLabel">Your bootcamp</p>
                            <h2>{bootcamp!.name}</h2>
                        </div>

                        <div className="publisherActions">
                            <button className="editButton" onClick={() => setBootcampOpen(true)}>
                                <Pencil size={16}/>
                                Edit
                            </button>

                            <button className="deleteButton" onClick={deleteBootcampAction}>
                                <Trash2 size={16}/>
                                Delete
                            </button>
                        </div>

                        {bootcampOpen &&
                            <BootcampModal
                                key={bootcamp?.id ?? "create"}
                                // open={bootcampOpen}
                                onClose={() => setBootcampOpen(false)}
                                loading={editBootcampLoading}
                                data={bootcamp}
                                onEditSubmit={handleBootcampEdit}
                            />
                        }
                    </div>

                    <p className="publisherDescription">
                        {bootcamp!.description}
                    </p>

                    <div className="publisherMeta" style={{justifyContent: "space-between"}}>
                        <div className={"publisherMeta"}>
                            {
                                bootcamp!.careers.map((career: string) => (
                                    <span>{career}</span>
                                ))
                            }
                        </div>
                        {bootcamp!.jobAssistance && <span>Job assistance</span>}
                    </div>
                </div>
            </section>

            <section className="publisherStats">
                <StatCard
                    icon={<BookOpen size={19}/>}
                    label="Courses"
                    value={bootcamp!.courses?.length || 0}
                />

                <StatCard
                    icon={<GraduationCap size={19}/>}
                    label="Enrollments"
                    value={enrollments?.data.length || 0}
                />

                <StatCard
                    icon={<Users size={19}/>}
                    label="Reviews"
                    value={reviews?.data?.length || 0}
                />

                <StatCard
                    icon={<Star size={19}/>}
                    label="Average rating"
                    value={bootcamp!.averageRating || "-"}
                />
            </section>

            <section className="publisherGrid">
                <div className="publisherPanel">
                    <div className="panelHeader">
                        <div>
                            <p className="publisherLabel">Programs</p>
                            <h3>Courses</h3>
                        </div>

                        {bootcamp!.courses && (
                            <button className="textButton" onClick={() => setCourseOpen(true)}>
                                + Add Course
                            </button>
                        )}

                        {courseOpen &&
                            <CourseModal
                                open={courseOpen}
                                onClose={() => setCourseOpen(false)}
                                loading={createCourseLoading}
                                onSubmit={submitCourse}
                            />
                        }
                    </div>

                    {!bootcamp!.courses ? (
                        <div className="courseEmptyState">
                            <div className="courseEmptyIcon">📚</div>

                            <h4>No courses yet</h4>

                            <p>
                                Your bootcamp is live, but you haven't created any
                                courses yet. Add your first course so students can
                                begin enrolling.
                            </p>

                            <button className="publisherCourseButton" onClick={() => setCourseOpen(true)}>
                                Create Your First Course
                            </button>

                            {courseOpen &&
                                <CourseModal
                                    open={courseOpen}
                                    onClose={() => setCourseOpen(false)}
                                    loading={createCourseLoading}
                                    onSubmit={submitCourse}
                                />
                            }
                        </div>
                    ) : (
                        <div className="publisherList">
                            {bootcamp!.courses?.map(course => (
                                <CourseRow
                                    key={course._id}
                                    title={course.title}
                                    duration={`${course.weeks} weeks`}
                                    tuition={StringUtil.formatCurrency(
                                        String(course.tuition),
                                        "USD"
                                    )}
                                    onDelete={() => deleteCourseAction(course._id)}
                                    onEdit={() => {
                                        setSelectedCourse(course);
                                        setCourseOpen(true);
                                    }}
                                />
                            ))}
                            {courseOpen &&
                                <CourseModal
                                    open={courseOpen}
                                    onClose={() => setCourseOpen(false)}
                                    loading={editCourseLoading}
                                    data={selectedCourse}
                                    onSubmit={handleEditCourse}
                                />
                            }
                        </div>
                    )}
                </div>

                <div className="publisherPanel">
                    <div className="panelHeader">
                        <div>
                            <p className="publisherLabel">Feedback</p>
                            <h3>Recent reviews</h3>
                        </div>

                        {reviews && reviews.data.length > 5 &&
                            <button className="textButton">
                                View all
                            </button>
                        }
                    </div>

                    <div className="publisherList">
                        {
                            reviews?.data.length === 0 ?
                                <p style={{fontSize: '15px'}}>No reviews yet</p> :
                                reviews?.data?.slice(0, 5).map((review) => (
                                    <ReviewRow
                                        name={review.user.name}
                                        rating={review.rating}
                                        text={review.text}
                                    />
                                ))
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}

type StatCardProps = {
    icon: React.ReactNode;
    label: string;
    value: string | number;
};

function StatCard({icon, label, value}: StatCardProps) {
    return (
        <article className="publisherStatCard">
            <div className="statIcon">{icon}</div>

            <div>
                <p>{label}</p>
                <strong>{value}</strong>
            </div>
        </article>
    );
}

function CourseRow({
                       key,
                       title,
                       duration,
                       tuition,
                       onEdit,
                       onDelete,
                   }: {
    key: string;
    title: string;
    duration: string;
    tuition: string;
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <div className="publisherListRow" key={key}>
            <div>
                <h4>{title}</h4>
                <p>{duration}</p>
            </div>

            <div className="courseActions">
                <strong>{tuition}</strong>

                <button
                    className="courseEditBtn"
                    onClick={onEdit}
                >
                    Edit
                </button>

                <button
                    className="courseDeleteBtn"
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

function ReviewRow({
                       name,
                       rating,
                       text,
                   }: {
    name: string;
    rating: number;
    text: string;
}) {
    return (
        <div className="reviewRow">
            <div className="reviewRowHeader">
                <h4>{name}</h4>
                <span>★ {rating}</span>
            </div>

            <p>{text}</p>
        </div>
    );
}