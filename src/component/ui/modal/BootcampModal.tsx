import {ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState,} from "react";
import {
    ArrowLeft,
    ArrowRight,
    BriefcaseBusiness,
    Building2,
    Check,
    GraduationCap,
    Plus,
    Sparkles,
    X,
} from "lucide-react";

import "./BootcampModal.css";
import {CreateBootcamp} from "@/model/response/bootcamp/CreateBootcampResponse.ts";
import {Bootcamp} from "@/model/response/bootcamp/BootcampResponse.ts";
import {UpdateBootcampRequest} from "@/model/request/bootcamp/UpdateBootcampRequest.ts";

// export interface CreateBootcampFormData {
//     name: string;
//     description: string;
//     website: string;
//     phone: string;
//     email: string;
//     address: string;
//     city: string;
//     state: string;
//     country: string;
//     zipcode: string;
//     careers: string[];
//     housing: boolean;
//     jobAssistance: boolean;
//     jobGuarantee: boolean;
//     acceptGi: boolean;
// }

interface CreateBootcampModalProps {
    // open: boolean;
    loading?: boolean;
    onClose: () => void;
    data?: Bootcamp;
    onSubmit?: (
        formData: CreateBootcamp
    ) => Promise<void> | void;
    onEditSubmit?: (
        formData: UpdateBootcampRequest
    ) => Promise<void> | void;
}

type FormErrors = Partial<
    Record<
        | "name"
        | "description"
        | "website"
        | "phone"
        | "email"
        | "address"
        | "city"
        | "state"
        | "country"
        | "zipcode"
        | "careers"
        | "category",
        string
    >
>;

const initialFormData: CreateBootcamp = {
    name: "",
    description: "",
    website: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    careers: [],
    category: [],
    housing: false,
    jobAssistance: false,
    jobGuarantee: false,
    acceptGi: false,
};

export const BootcampModal = ({
                                  // open,
                                  loading = false,
                                  onClose,
                                  onSubmit,
                                  onEditSubmit,
                                  data
                              }: CreateBootcampModalProps) => {
    const [step, setStep] = useState<1 | 2>(1);
    const [careerInput, setCareerInput] = useState("");
    const [categoryInput, setCategoryInput] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});

    // const formik = useFormik({
    //     initialValues: initialFormData,
    //     onSubmit: (values) => console.log(values),
    //     validationSchema: BootcampValidation
    // })

    const [formData, setFormData] =
        useState<CreateBootcamp>(initialFormData);

    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    const handleClose = () => {
        setStep(1);
        setErrors({});
        setCareerInput("");
        setFormData(initialFormData);
        onClose();
    };

    useEffect(() => {
        // if (!open) return;

        const handleKeyDown = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape" && !loading) {
                handleClose();
            }
        };

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [loading, onClose]);

    // if (!open) {
    //     return null;
    // }

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));

        setErrors((current) => ({
            ...current,
            [name]: undefined,
        }));
    };

    const handleToggle = (
        field:
            | "housing"
            | "jobAssistance"
            | "jobGuarantee"
            | "acceptGi"
    ) => {
        setFormData((current) => ({
            ...current,
            [field]: !current[field],
        }));
    };

    const addCareer = () => {
        const normalizedCareer = careerInput.trim();

        if (!normalizedCareer) return;

        const alreadyExists = formData.careers.some(
            (career) =>
                career.toLowerCase() === normalizedCareer.toLowerCase()
        );

        if (alreadyExists) {
            setCareerInput("");
            return;
        }

        setFormData((current) => ({
            ...current,
            careers: [...current.careers, normalizedCareer],
        }));

        setCareerInput("");

        setErrors((current) => ({
            ...current,
            careers: undefined,
        }));
    };

    const addCategory = () => {
        const normalizedCategory = categoryInput.trim();

        if (!normalizedCategory) return;

        const alreadyExists = formData.category.some(
            (category) =>
                category.toLowerCase() === normalizedCategory.toLowerCase()
        );

        if (alreadyExists) {
            setCategoryInput("");
            return;
        }

        setFormData((current) => ({
            ...current,
            category: [...current.category, normalizedCategory],
        }));

        setCategoryInput("");

        setErrors((current) => ({
            ...current,
            category: undefined,
        }));
    };

    const removeCareer = (careerToRemove: string) => {
        setFormData((current) => ({
            ...current,
            careers: current.careers.filter(
                (career) => career !== careerToRemove
            ),
        }));
    };

    const removeCategory = (categoryToRemove: string) => {
        setFormData((current) => ({
            ...current,
            category: current.category.filter(
                (category) => category !== categoryToRemove
            ),
        }));
    };

    const handleCareerKeyDown = (
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            addCareer();
        }
    };

    const handleCategoryKeyDown = (
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            addCategory();
        }
    };

    const validateStepOne = () => {
        const nextErrors: FormErrors = {};

        if (!formData.name.trim()) {
            nextErrors.name = "Bootcamp name is required.";
        }

        if (formData.name.trim().length < 3) {
            nextErrors.name =
                "Bootcamp name must contain at least 3 characters.";
        }

        if (!formData.description.trim()) {
            nextErrors.description = "Description is required.";
        }

        if (formData.description.trim().length < 20) {
            nextErrors.description =
                "Description must contain at least 20 characters.";
        }

        if (!formData.website.trim()) {
            nextErrors.website = "Website is required.";
        }

        if (!formData.phone.trim()) {
            nextErrors.phone = "Phone number is required.";
        }

        if (!formData.email.trim()) {
            nextErrors.email = "Email address is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            nextErrors.email = "Enter a valid email address.";
        }

        if (!formData.address.trim()) {
            nextErrors.address = "Address is required.";
        }
        // if (!formData.city.trim()) {
        //     nextErrors.city = "City is required.";
        // }
        // if (!formData.state.trim()) {
        //     nextErrors.state = "State is required.";
        // }
        // if (!formData.country.trim()) {
        //     nextErrors.country = "Country is required.";
        // }
        // if (!formData.zipcode.trim()) {
        //     nextErrors.zipcode = "ZipCode is required.";
        // }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const validateStepTwo = () => {
        const nextErrors: FormErrors = {};

        if (formData.careers.length === 0) {
            nextErrors.careers = "Add at least one career.";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const handleNext = () => {
        if (!validateStepOne()) return;

        setStep(2);
    };

    const handleSubmit = async (
        event: any
    ) => {
        event.preventDefault();

        if (step === 1) {
            handleNext();
            return;
        }

        if (!validateStepTwo()) return;

        // const fullAddress = [
        //     formData.address,
        //     formData.city,
        //     formData.state,
        //     formData.zipcode,
        //     formData.country,
        // ]
        //     .filter((value) => value?.trim())
        //     .join(", ");
        // setFormData((prev) => ({
        //     ...prev,
        //     address: fullAddress
        // }));
        console.log("step", step)
        if (onSubmit) await onSubmit(formData);
        else if (onEditSubmit) await onEditSubmit(formData);
        handleClose();
    };

    const handleBackdropClick = (
        event: MouseEvent<HTMLDivElement>
    ) => {
        if (event.target === event.currentTarget && !loading) {
            handleClose();
        }
    };


    return (
        <div
            className="create-bootcamp-backdrop"
            onMouseDown={handleBackdropClick}
            role="presentation"
        >
            <section
                className="create-bootcamp-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="create-bootcamp-title"
            >
                <header className="create-bootcamp-header">
                    <div>
                        <p className="create-bootcamp-eyebrow">
                            Publisher dashboard
                        </p>

                        <h2 id="create-bootcamp-title">
                            Create your bootcamp
                        </h2>

                        <p>
                            Add your bootcamp information and select the
                            services you provide.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="create-bootcamp-close"
                        onClick={handleClose}
                        disabled={loading}
                        aria-label="Close create bootcamp modal"
                    >
                        <X size={20}/>
                    </button>
                </header>

                <div className="create-bootcamp-stepper">
                    <div
                        className={`create-bootcamp-step ${
                            step >= 1 ? "active" : ""
                        }`}
                    >
                        <span>
                            {step > 1 ? <Check size={15}/> : "1"}
                        </span>

                        <div>
                            <strong>Bootcamp details</strong>
                            <small>Basic and contact information</small>
                        </div>
                    </div>

                    <div
                        className={`create-bootcamp-step-line ${
                            step === 2 ? "active" : ""
                        }`}
                    />

                    <div
                        className={`create-bootcamp-step ${
                            step === 2 ? "active" : ""
                        }`}
                    >
                        <span>2</span>

                        <div>
                            <strong>Programs and features</strong>
                            <small>Careers and student services</small>
                        </div>
                    </div>
                </div>

                <form
                    className="create-bootcamp-form"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div className="create-bootcamp-content">
                        {step === 1 && (
                            <div className="create-bootcamp-step-content">
                                <div className="create-bootcamp-section-heading">
                                    <div className="create-bootcamp-section-icon">
                                        <Building2 size={20}/>
                                    </div>

                                    <div>
                                        <h3>Basic information</h3>
                                        <p>
                                            Tell students about your
                                            bootcamp.
                                        </p>
                                    </div>
                                </div>

                                <div className="create-bootcamp-field">
                                    <label htmlFor="bootcamp-name">
                                        Bootcamp name
                                        <span>*</span>
                                    </label>

                                    <input
                                        id="bootcamp-name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g. ModernTech Bootcamp"
                                        className={
                                            errors.name ? "has-error" : ""
                                        }
                                    />

                                    {errors.name && (
                                        <p className="create-bootcamp-error">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="create-bootcamp-field">
                                    <div className="create-bootcamp-label-row">
                                        <label htmlFor="bootcamp-description">
                                            Description
                                            <span>*</span>
                                        </label>

                                        <small>
                                            {formData.description.length}/500
                                        </small>
                                    </div>

                                    <textarea
                                        id="bootcamp-description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe your bootcamp, teaching approach and student outcomes..."
                                        maxLength={500}
                                        rows={5}
                                        className={
                                            errors.description
                                                ? "has-error"
                                                : ""
                                        }
                                    />

                                    {errors.description && (
                                        <p className="create-bootcamp-error">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <div className="create-bootcamp-field">
                                    <label htmlFor="career-input">
                                        Category(s)
                                        <span>*</span>
                                    </label>

                                    {formData.category.length > 0 && (
                                        <div className="create-bootcamp-tags">
                                            {formData.category.map(
                                                (category) => (
                                                    <span
                                                        className="create-bootcamp-tag"
                                                        key={category}
                                                    >
                                                        {category}

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeCategory(
                                                                    category
                                                                )
                                                            }
                                                            aria-label={`Remove ${category}`}
                                                        >
                                                            <X size={14}/>
                                                        </button>
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    )}

                                    <div
                                        className={`create-bootcamp-career-input ${
                                            errors.category
                                                ? "has-error"
                                                : ""
                                        }`}
                                    >
                                        <input
                                            id="career-input"
                                            type="text"
                                            value={categoryInput}
                                            onChange={(event) =>
                                                setCategoryInput(
                                                    event.target.value
                                                )
                                            }
                                            onKeyDown={
                                                handleCategoryKeyDown
                                            }
                                            placeholder="e.g. Mobile Development"
                                        />

                                        <button
                                            type="button"
                                            onClick={addCategory}
                                            disabled={!careerInput.trim()}
                                        >
                                            <Plus size={17}/>
                                            Add
                                        </button>
                                    </div>

                                    <small className="create-bootcamp-help">
                                        Press Enter or comma to add a category.
                                    </small>

                                    {errors.category && (
                                        <p className="create-bootcamp-error">
                                            {errors.category}
                                        </p>
                                    )}
                                </div>

                                <div className="create-bootcamp-divider"/>

                                <div className="create-bootcamp-section-heading">
                                    <div className="create-bootcamp-section-icon">
                                        <BriefcaseBusiness size={20}/>
                                    </div>

                                    <div>
                                        <h3>Contact information</h3>
                                        <p>
                                            Let prospective students reach
                                            your team.
                                        </p>
                                    </div>
                                </div>

                                <div className="create-bootcamp-grid">
                                    <div className="create-bootcamp-field">
                                        <label htmlFor="bootcamp-website">
                                            Website
                                            <span>*</span>
                                        </label>

                                        <input
                                            id="bootcamp-website"
                                            name="website"
                                            type="url"
                                            value={formData.website}
                                            onChange={handleInputChange}
                                            placeholder="https://moderntech.com"
                                            className={
                                                errors.website
                                                    ? "has-error"
                                                    : ""
                                            }
                                        />

                                        {errors.website && (
                                            <p className="create-bootcamp-error">
                                                {errors.website}
                                            </p>
                                        )}
                                    </div>

                                    <div className="create-bootcamp-field">
                                        <label htmlFor="bootcamp-phone">
                                            Phone number
                                            <span>*</span>
                                        </label>

                                        <input
                                            id="bootcamp-phone"
                                            name="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="(222) 222-2222"
                                            className={
                                                errors.phone
                                                    ? "has-error"
                                                    : ""
                                            }
                                        />

                                        {errors.phone && (
                                            <p className="create-bootcamp-error">
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="create-bootcamp-field">
                                    <label htmlFor="bootcamp-email">
                                        Enrollment email
                                        <span>*</span>
                                    </label>

                                    <input
                                        id="bootcamp-email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="enroll@moderntech.com"
                                        className={
                                            errors.email ? "has-error" : ""
                                        }
                                    />

                                    {errors.email && (
                                        <p className="create-bootcamp-error">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/*<div style={{width: '100%', display: 'flex', gap: '10px'}}>*/}
                                <div className="create-bootcamp-field">
                                    <label htmlFor="bootcamp-address">
                                        Address
                                        <span>*</span>
                                    </label>

                                    <input
                                        id="bootcamp-address"
                                        name="address"
                                        type="text"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        placeholder="220 Pawtucket St, Lowell, MA, 01854"
                                        className={
                                            errors.address
                                                ? "has-error"
                                                : ""
                                        }
                                    />

                                    {errors.address && (
                                        <p className="create-bootcamp-error">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>
                                {/*<div className="create-bootcamp-field" style={{width: '30%'}}>*/}
                                {/*    <label htmlFor="bootcamp-zipcode">*/}
                                {/*        ZipCode*/}
                                {/*        <span>*</span>*/}
                                {/*    </label>*/}

                                {/*    <input*/}
                                {/*        id="bootcamp-zipcode"*/}
                                {/*        name="zipcode"*/}
                                {/*        type="text"*/}
                                {/*        value={formData.zipcode}*/}
                                {/*        onChange={handleInputChange}*/}
                                {/*        placeholder="01854"*/}
                                {/*        className={*/}
                                {/*            errors.zipcode*/}
                                {/*                ? "has-error"*/}
                                {/*                : ""*/}
                                {/*        }*/}
                                {/*    />*/}

                                {/*    {errors.zipcode && (*/}
                                {/*        <p className="create-bootcamp-error">*/}
                                {/*            {errors.zipcode}*/}
                                {/*        </p>*/}
                                {/*    )}*/}
                                {/*</div>*/}
                                {/*</div>*/}

                                {/*<div style={{display: 'flex', justifyContent: 'space-between'}}>*/}
                                {/*    <div className="create-bootcamp-field">*/}
                                {/*        <label htmlFor="bootcamp-city">*/}
                                {/*            City*/}
                                {/*            <span>*</span>*/}
                                {/*        </label>*/}

                                {/*        <input*/}
                                {/*            id="bootcamp-city"*/}
                                {/*            name="city"*/}
                                {/*            type="text"*/}
                                {/*            value={formData.city}*/}
                                {/*            onChange={handleInputChange}*/}
                                {/*            placeholder="Lowell"*/}
                                {/*            className={*/}
                                {/*                errors.city*/}
                                {/*                    ? "has-error"*/}
                                {/*                    : ""*/}
                                {/*            }*/}
                                {/*        />*/}

                                {/*        {errors.city && (*/}
                                {/*            <p className="create-bootcamp-error">*/}
                                {/*                {errors.city}*/}
                                {/*            </p>*/}
                                {/*        )}*/}
                                {/*    </div>*/}

                                {/*    <div className="create-bootcamp-field">*/}
                                {/*        <label htmlFor="bootcamp-state">*/}
                                {/*            State*/}
                                {/*            <span>*</span>*/}
                                {/*        </label>*/}

                                {/*        <input*/}
                                {/*            id="bootcamp-state"*/}
                                {/*            name="state"*/}
                                {/*            type="text"*/}
                                {/*            value={formData.state}*/}
                                {/*            onChange={handleInputChange}*/}
                                {/*            placeholder="MA"*/}
                                {/*            className={*/}
                                {/*                errors.state*/}
                                {/*                    ? "has-error"*/}
                                {/*                    : ""*/}
                                {/*            }*/}
                                {/*        />*/}

                                {/*        {errors.state && (*/}
                                {/*            <p className="create-bootcamp-error">*/}
                                {/*                {errors.state}*/}
                                {/*            </p>*/}
                                {/*        )}*/}
                                {/*    </div>*/}

                                {/*    <div className="create-bootcamp-field">*/}
                                {/*        <label htmlFor="bootcamp-address">*/}
                                {/*            Country*/}
                                {/*            <span>*</span>*/}
                                {/*        </label>*/}

                                {/*        <input*/}
                                {/*            id="bootcamp-country"*/}
                                {/*            name="country"*/}
                                {/*            type="text"*/}
                                {/*            value={formData.country}*/}
                                {/*            onChange={handleInputChange}*/}
                                {/*            placeholder="United States"*/}
                                {/*            className={*/}
                                {/*                errors.country*/}
                                {/*                    ? "has-error"*/}
                                {/*                    : ""*/}
                                {/*            }*/}
                                {/*        />*/}

                                {/*        {errors.country && (*/}
                                {/*            <p className="create-bootcamp-error">*/}
                                {/*                {errors.country}*/}
                                {/*            </p>*/}
                                {/*        )}*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="create-bootcamp-step-content">
                                <div className="create-bootcamp-section-heading">
                                    <div className="create-bootcamp-section-icon">
                                        <GraduationCap size={20}/>
                                    </div>

                                    <div>
                                        <h3>Careers offered</h3>
                                        <p>
                                            Add the career paths students
                                            can pursue.
                                        </p>
                                    </div>
                                </div>

                                <div className="create-bootcamp-field">
                                    <label htmlFor="career-input">
                                        Career paths
                                        <span>*</span>
                                    </label>

                                    {formData.careers.length > 0 && (
                                        <div className="create-bootcamp-tags">
                                            {formData.careers.map(
                                                (career) => (
                                                    <span
                                                        className="create-bootcamp-tag"
                                                        key={career}
                                                    >
                                                        {career}

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeCareer(
                                                                    career
                                                                )
                                                            }
                                                            aria-label={`Remove ${career}`}
                                                        >
                                                            <X size={14}/>
                                                        </button>
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    )}

                                    <div
                                        className={`create-bootcamp-career-input ${
                                            errors.careers
                                                ? "has-error"
                                                : ""
                                        }`}
                                    >
                                        <input
                                            id="career-input"
                                            type="text"
                                            value={careerInput}
                                            onChange={(event) =>
                                                setCareerInput(
                                                    event.target.value
                                                )
                                            }
                                            onKeyDown={
                                                handleCareerKeyDown
                                            }
                                            placeholder="e.g. Web Development"
                                        />

                                        <button
                                            type="button"
                                            onClick={addCareer}
                                            disabled={!careerInput.trim()}
                                        >
                                            <Plus size={17}/>
                                            Add
                                        </button>
                                    </div>

                                    <small className="create-bootcamp-help">
                                        Press Enter or comma to add a career.
                                    </small>

                                    {errors.careers && (
                                        <p className="create-bootcamp-error">
                                            {errors.careers}
                                        </p>
                                    )}
                                </div>

                                <div className="create-bootcamp-divider"/>

                                <div className="create-bootcamp-section-heading">
                                    <div className="create-bootcamp-section-icon">
                                        <Sparkles size={20}/>
                                    </div>

                                    <div>
                                        <h3>Student services</h3>
                                        <p>
                                            Select the benefits your
                                            bootcamp provides.
                                        </p>
                                    </div>
                                </div>

                                <div className="create-bootcamp-feature-list">
                                    <ToggleRow
                                        title="Housing available"
                                        description="Housing options are available for enrolled students."
                                        checked={formData.housing}
                                        onChange={() =>
                                            handleToggle("housing")
                                        }
                                    />

                                    <ToggleRow
                                        title="Job assistance"
                                        description="Students receive support with job searching and career preparation."
                                        checked={formData.jobAssistance}
                                        onChange={() =>
                                            handleToggle("jobAssistance")
                                        }
                                    />

                                    <ToggleRow
                                        title="Job guarantee"
                                        description="Eligible graduates receive a job placement guarantee."
                                        checked={formData.jobGuarantee}
                                        onChange={() =>
                                            handleToggle("jobGuarantee")
                                        }
                                    />

                                    <ToggleRow
                                        title="Accepts GI Bill"
                                        description="Students can use eligible GI Bill education benefits."
                                        checked={formData.acceptGi}
                                        onChange={() =>
                                            handleToggle("acceptGi")
                                        }
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <footer className="create-bootcamp-footer">
                        <button
                            type="button"
                            className="create-bootcamp-secondary-button"
                            onClick={
                                step === 1
                                    ? handleClose
                                    : () => setStep(1)
                            }
                            disabled={loading}
                        >
                            {step === 2 && <ArrowLeft size={17}/>}
                            {step === 1 ? "Cancel" : "Back"}
                        </button>

                        {step === 1 ? (
                            <button
                                type="button"
                                className="create-bootcamp-primary-button"
                                onClick={handleNext}
                            >
                                Continue
                                <ArrowRight size={17}/>
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="create-bootcamp-primary-button"
                                disabled={loading}
                                onClick={handleSubmit}
                            >
                                {loading
                                    ? "Loading..."
                                    : data
                                        ? "Edit bootcamp"
                                        : "Create bootcamp"}
                            </button>
                        )}
                    </footer>
                </form>
            </section>
        </div>
    );
};

interface ToggleRowProps {
    title: string;
    description: string;
    checked: boolean;
    onChange: () => void;
}

const ToggleRow = ({
                       title,
                       description,
                       checked,
                       onChange,
                   }: ToggleRowProps) => {
    return (
        <div className="create-bootcamp-toggle-row">
            <div>
                <strong>{title}</strong>
                <p>{description}</p>
            </div>

            <label className="create-bootcamp-switch">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />

                <span className="create-bootcamp-slider"/>
            </label>
        </div>
    );
};