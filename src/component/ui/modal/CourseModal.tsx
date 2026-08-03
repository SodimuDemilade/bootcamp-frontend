import {FormEvent, useEffect, useState} from "react";
import {BookOpen, Clock3, DollarSign, GraduationCap, X} from "lucide-react";
import "./CourseModal.css";
import {CreateCourseRequest} from "@/model/request/course/CreateCourseRequest.ts";


interface CreateCourseModalProps {
    open: boolean;
    loading?: boolean;
    onClose: () => void;
    data?: CreateCourseRequest;
    onSubmit: (data: CreateCourseRequest) => Promise<void> | void;
}

type FormErrors = Partial<Record<
    "title" | "description" | "weeks" | "tuition" | "minimumSkill",
    string
>>;

const initialFormData: CreateCourseRequest = {
    title: "",
    description: "",
    weeks: 8,
    tuition: 0,
    minimumSkill: "beginner",
    scholarshipAvailable: false,
};

export const CourseModal = ({
                                open,
                                loading = false,
                                onClose,
                                onSubmit,
                                data
                            }: CreateCourseModalProps) => {
    const [formData, setFormData] =
        useState<CreateCourseRequest>(initialFormData);

    const [errors, setErrors] = useState<FormErrors>({});

    useEffect(() => {
        if (data) setFormData(data);
    }, [data]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const previousOverflow = document.body.style.overflow;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape" && !loading) {
                onClose();
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, loading, onClose]);

    if (!open) {
        return null;
    }

    const handleInputChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const {name, value} = event.target;

        setFormData(previous => ({
            ...previous,
            [name]:
                name === "weeks" || name === "tuition"
                    ? Number(value)
                    : value,
        }));

        if (errors[name as keyof FormErrors]) {
            setErrors(previous => ({
                ...previous,
                [name]: undefined,
            }));
        }
    };

    const validateForm = () => {
        const nextErrors: FormErrors = {};

        if (!formData.title.trim()) {
            nextErrors.title = "Course title is required.";
        }

        if (!formData.description.trim()) {
            nextErrors.description = "Course description is required.";
        } else if (formData.description.trim().length < 40) {
            nextErrors.description =
                "Provide at least 40 characters describing the course.";
        }

        if (!formData.weeks || formData.weeks < 1) {
            nextErrors.weeks = "Course duration must be at least one week.";
        }

        if (formData.tuition < 0) {
            nextErrors.tuition = "Tuition cannot be negative.";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        await onSubmit({
            ...formData,
            title: formData.title.trim(),
            description: formData.description.trim(),
        });
        onClose();
    };

    const handleBackdropClick = (
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        if (event.target === event.currentTarget && !loading) {
            onClose();
        }
    };

    return (
        <div
            className="createCourseOverlay"
            role="presentation"
            onMouseDown={handleBackdropClick}
        >
            <section
                className="createCourseModal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-course-title"
            >
                <header className="createCourseHeader">
                    <div className="createCourseHeading">
                        <div className="createCourseHeaderIcon">
                            <BookOpen size={23}/>
                        </div>

                        <div>
                            {/*<p className="createCourseEyebrow">*/}
                            {/*    Course management*/}
                            {/*</p>*/}

                            <h2 id="create-course-title">
                                {data ? "Edit" : "Create a new"} course
                            </h2>

                            <p>
                                Add a program students can discover and enrol in.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="createCourseCloseButton"
                        onClick={onClose}
                        disabled={loading}
                        aria-label="Close create course modal"
                    >
                        <X size={21}/>
                    </button>
                </header>

                <form onSubmit={handleSubmit}>
                    <div className="createCourseBody">
                        <section className="createCourseSection">
                            <div className="createCourseSectionHeader">
                                <div className="createCourseSectionIcon">
                                    <GraduationCap size={20}/>
                                </div>

                                <div>
                                    <h3>Course information</h3>
                                    <p>
                                        Give students a clear overview of what
                                        they will learn.
                                    </p>
                                </div>
                            </div>

                            <div className="createCourseField">
                                <label htmlFor="course-title">
                                    Course title
                                    <span>*</span>
                                </label>

                                <input
                                    id="course-title"
                                    name="title"
                                    type="text"
                                    placeholder="e.g. Front End Web Development"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className={
                                        errors.title ? "inputError" : ""
                                    }
                                />

                                {errors.title && (
                                    <p className="createCourseError">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div className="createCourseField">
                                <div className="createCourseLabelRow">
                                    <label htmlFor="course-description">
                                        Description
                                        <span>*</span>
                                    </label>

                                    <small>
                                        {formData.description.length}/1,000
                                    </small>
                                </div>

                                <textarea
                                    id="course-description"
                                    name="description"
                                    rows={6}
                                    maxLength={1000}
                                    placeholder="Describe the technologies, skills and outcomes students can expect from this course."
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className={
                                        errors.description ? "inputError" : ""
                                    }
                                />

                                {errors.description && (
                                    <p className="createCourseError">
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                        </section>

                        <section className="createCourseSection">
                            <div className="createCourseSectionHeader">
                                <div className="createCourseSectionIcon">
                                    <Clock3 size={20}/>
                                </div>

                                <div>
                                    <h3>Duration and pricing</h3>
                                    <p>
                                        Set the course length and tuition fee.
                                    </p>
                                </div>
                            </div>

                            <div className="createCourseGrid">
                                <div className="createCourseField">
                                    <label htmlFor="course-weeks">
                                        Duration
                                        <span>*</span>
                                    </label>

                                    <div className="createCourseInputGroup">
                                        <Clock3 size={18}/>

                                        <input
                                            id="course-weeks"
                                            name="weeks"
                                            type="number"
                                            min={1}
                                            max={104}
                                            value={formData.weeks}
                                            onChange={handleInputChange}
                                            className={
                                                errors.weeks
                                                    ? "inputError"
                                                    : ""
                                            }
                                        />

                                        <span className="inputSuffix">
                                            weeks
                                        </span>
                                    </div>

                                    {errors.weeks && (
                                        <p className="createCourseError">
                                            {errors.weeks}
                                        </p>
                                    )}
                                </div>

                                <div className="createCourseField">
                                    <label htmlFor="course-tuition">
                                        Tuition
                                        <span>*</span>
                                    </label>

                                    <div className="createCourseInputGroup">
                                        <DollarSign size={18}/>

                                        <input
                                            id="course-tuition"
                                            name="tuition"
                                            type="number"
                                            min={0}
                                            step={100}
                                            placeholder="8000"
                                            value={formData.tuition}
                                            onChange={handleInputChange}
                                            className={
                                                errors.tuition
                                                    ? "inputError"
                                                    : ""
                                            }
                                        />

                                        <span className="inputSuffix">
                                            USD
                                        </span>
                                    </div>

                                    {errors.tuition && (
                                        <p className="createCourseError">
                                            {errors.tuition}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </section>

                        <section className="createCourseSection">
                            <div className="createCourseSectionHeader">
                                <div className="createCourseSectionIcon">
                                    <BookOpen size={20}/>
                                </div>

                                <div>
                                    <h3>Admission details</h3>
                                    <p>
                                        Help students understand whether the
                                        course is suitable for them.
                                    </p>
                                </div>
                            </div>

                            <div className="createCourseField">
                                <label htmlFor="minimum-skill">
                                    Minimum skill level
                                    <span>*</span>
                                </label>

                                <select
                                    id="minimum-skill"
                                    name="minimumSkill"
                                    value={formData.minimumSkill}
                                    onChange={handleInputChange}
                                >
                                    <option value="beginner">
                                        Beginner
                                    </option>

                                    <option value="intermediate">
                                        Intermediate
                                    </option>

                                    <option value="advanced">
                                        Advanced
                                    </option>
                                </select>
                            </div>

                            <label className="createCourseToggleCard">
                                <div>
                                    <strong>
                                        Scholarships available
                                    </strong>

                                    <p>
                                        Let students know that financial
                                        assistance may be available.
                                    </p>
                                </div>

                                <input
                                    type="checkbox"
                                    checked={
                                        formData.scholarshipAvailable
                                    }
                                    onChange={event =>
                                        setFormData(previous => ({
                                            ...previous,
                                            scholarshipAvailable:
                                            event.target.checked,
                                        }))
                                    }
                                />

                                <span className="createCourseToggle">
                                    <span/>
                                </span>
                            </label>
                        </section>
                    </div>

                    <footer className="createCourseFooter">
                        <button
                            type="button"
                            className="createCourseSecondaryButton"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="createCoursePrimaryButton"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : data ? "Edit Course" : "Create course"}
                        </button>
                    </footer>
                </form>
            </section>
        </div>
    );
};