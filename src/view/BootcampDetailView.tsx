import './BootcampDetailView.css'
import {useLocation, useNavigate} from "react-router-dom";
import {Rating} from "../component/ui/rating.tsx";
import {StringUtil} from "../util/stringUtil.ts";
import type {Course} from "../model/response/course/CourseResponse.ts";
import {RootState} from "@/store";
import {useSelector} from "react-redux";
import {RouteConstant} from "@/util/constants/routeConstant.ts";
import {EnrollmentService} from "@/service/EnrollmentService.ts";
import {toastUtil} from "@/util/toastUtil.ts";
import {useEffect, useState} from "react";
import ReviewModal from "@/component/ui/modal/ReviewModal.tsx";
import {ReviewService} from "@/service/ReviewService.ts";

export function BootcampDetailView() {
    const {state} = useLocation();
    const {bootcamp} = state;
    const navigate = useNavigate();
    const authState = useSelector((state: RootState) => state.auth);
    const [enroll] = EnrollmentService.useEnrollMutation();
    const {data} = EnrollmentService.useReadUserEnrollmentQuery(undefined, {
        skip: authState.userInfo.role !== "user",
    });
    const [enrolled, setEnrolled] = useState(false);
    const [reviewOpen, setReviewOpen] = useState(false);
    const [createReview, {isLoading: createLoading}] = ReviewService.useCreateReviewMutation();
    const [updateReview, {isLoading: updateLoading}] = ReviewService.useUpdateReviewMutation();
    const {data: reviews} = ReviewService.useReadReviewQuery(bootcamp._id);
    const writtenReview = reviews?.data.find(review => review.user._id === authState.userInfo._id)


    const enrollUser = async (bootcampId: string) => {
        if (!authState.token) {
            localStorage.currentPath = location.pathname;
            navigate(RouteConstant.auth.login.path);
        } else if (authState.userInfo.role != "user") {
            toastUtil.showUniqueToast(
                "access-error",
                "Only users can enroll for bootcamps.",
                "error"
            );
        } else {
            const request = {
                "bootcamp": bootcampId,
                "status": "Active",
                "paymentStatus": "Paid"
            }
            await enroll(request);
            toastUtil.showUniqueToast(
                "enrolled",
                "Successfully enrolled",
                "success"
            )
            setEnrolled(true);
        }
    }

    const openReview = () => {
        if (!authState.token) {
            localStorage.currentPath = location.pathname;
            navigate(RouteConstant.auth.login.path);
        } else {
            setReviewOpen(true);
        }
    }

    useEffect(() => {
        if (!data?.data || !bootcamp?._id) return;

        const userIsEnrolled = data.data.some((enrollment) => {
            return enrollment.bootcamp === bootcamp._id;
        });

        setEnrolled(userIsEnrolled);
    }, [data, bootcamp?._id]);


    const submitReview = async (rating: number, review: string, title: string) => {
        let response;
        if (!writtenReview) {
            response = await createReview({
                data: {
                    title: title,
                    rating: rating,
                    text: review,
                },
                bootcampId: bootcamp._id,
            });
        } else {
            response = await updateReview({
                data: {
                    title: title,
                    rating: rating,
                    text: review,
                },
                id: writtenReview._id,
            });
        }
        setReviewOpen(false);
        if (!response.error) toastUtil.showUniqueToast("Successful Review", "Review Successfully added!", "success");
    }


    return (
        <div className="bootcampPage">
            <div className="bootcampHero">
                <img
                    src="/images/webDev.jpg"
                    className="heroImage"
                    alt="bootcamp"
                />

                <div className="heroInfo">
                    <h1 className="heroTitle">
                        {bootcamp.name}
                    </h1>

                    <div className="heroRating">
                        <Rating rating={bootcamp.averageRating}/>
                        <span>{bootcamp.averageRating?.toFixed(2)} (120 reviews)</span>
                    </div>

                    <a href={bootcamp.website} className="heroLink">
                        Visit Website
                    </a>

                    <div className="heroTags">
                        {
                            bootcamp.careers.map((career: string) => (
                                <span>{career}</span>
                            ))
                        }
                        {/*<span>Frontend</span>*/}
                        {/*<span>Backend</span>*/}
                        {/*<span>React</span>*/}
                        {/*<span>Node.js</span>*/}
                    </div>

                    <div className="heroMeta">

                        <div className="heroMetaItem">
                            <p className="heroMetaLabel">Average Cost</p>
                            <p className="heroMetaValue">
                                ${StringUtil.handleCurrencyFormatter(bootcamp.averageCost)}
                            </p>
                        </div>

                        <div className="heroMetaItem">
                            <p className="heroMetaLabel">Job Assistance</p>

                            <p
                                className={
                                    bootcamp.jobAssistance
                                        ? "heroSuccess"
                                        : "heroDanger"
                                }
                            >
                                {bootcamp.jobAssistance ? "Available" : "Not Included"}
                            </p>
                        </div>

                        <div className="heroMetaItem">
                            <p className="heroMetaLabel">Job Guarantee</p>

                            <p
                                className={
                                    bootcamp.jobGuarantee
                                        ? "heroSuccess"
                                        : "heroDanger"
                                }
                            >
                                {bootcamp.jobGuarantee ? "Guaranteed" : "No Guarantee"}
                            </p>
                        </div>

                    </div>

                    {(authState.userInfo.role === "user" || !authState.token) &&
                        <div className="heroActions">
                            {
                                enrolled ?
                                    <p style={{color: "#4F46E5", fontWeight: 600}}>Enrolled</p>
                                    :
                                    <button className="primaryBtn" onClick={() => enrollUser(bootcamp._id)}>Enroll
                                        Now</button>
                            }
                            <button className="secondaryBtn">Save</button>
                        </div>
                    }

                </div>

            </div>

            {/* ABOUT */}
            <section className="section">
                <h2>About</h2>
                <p className="aboutText">
                    {bootcamp.description}
                </p>
            </section>

            {/* COURSES */}
            <section className="section">
                <h2>Courses</h2>

                <div className="courseGrid">
                    {
                        bootcamp.courses.map((course: Course) => (
                            <div className="courseCard">
                                <div className="courseCardTop">
                                    <div className="courseLevel">
                                        {course.minimumSkill.toUpperCase()}
                                    </div>
                                    <div className="courseDuration">
                                        {course.weeks} Weeks
                                    </div>
                                </div>
                                <div className="courseContent">
                                    <h3 className="courseTitle">
                                        {course.title}
                                    </h3>
                                    <p className="courseDescription">
                                        {course.description}
                                    </p>
                                </div>

                                <div className="courseTags">
                                    <div className="courseTag">React</div>
                                    <div className="courseTag">TypeScript</div>
                                    <div className="courseTag">APIs</div>
                                </div>

                                {/*<div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>*/}
                                {/*    <p className={"heroMetaLabel"}>Scholarship: </p>*/}
                                {/*    <p className={course.scholarshipAvailable ? "heroSuccess" : "heroDanger"}>{course.scholarshipAvailable ? "Available" : "Not Included"}</p>*/}
                                {/*</div>*/}

                                <div className="courseFooter">
                                    <p className="coursePrice">
                                        ${StringUtil.handleCurrencyFormatter(String(course.tuition))}
                                    </p>
                                    <button className="courseButton">
                                        View Course
                                    </button>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </section>

            {/* REVIEWS */}
            <section className="section">

                <div className="reviewSectionHeader">
                    <div>
                        <h2>Reviews</h2>
                        <p className="reviewSectionSubtitle">
                            See what past students have to say.
                        </p>
                    </div>

                    {authState.userInfo.role !== "publisher" &&
                        <button className="reviewButton" onClick={openReview}>
                            {writtenReview ? "Edit my" : "Write a"} Review
                        </button>
                    }

                    {reviewOpen &&
                        <ReviewModal
                            open={reviewOpen}
                            onClose={() => setReviewOpen(false)}
                            loading={createLoading || updateLoading}
                            // edit={writtenReview != undefined}
                            formData={{...writtenReview, review: writtenReview?.text}}
                            onSubmit={submitReview}
                        />
                    }
                </div>

                <div className="reviewGrid">
                    {reviews?.data.map((review) => (
                        <div className="reviewCard">
                            <div className="reviewTop">
                                <p className="reviewName">{review.user.name}</p>
                                <Rating rating={review.rating} fill={"black"} color={"transparent"}/>
                            </div>

                            <p className="reviewText">
                                {review.text}
                            </p>
                        </div>
                    ))}
                </div>

            </section>

        </div>
    );
}