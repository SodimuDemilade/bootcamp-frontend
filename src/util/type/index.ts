import {type FormikValues, useFormik} from "formik";
import * as React from "react";
import {type CSSProperties, ReactNode} from "react";
import {User} from "@/model/response/user/ReadUserResponse.ts";

export type Formik<Values extends FormikValues = FormikValues> = ReturnType<typeof useFormik<Values>>;

export interface CustomCSSProperties extends CSSProperties {
    [key: `--${string}`]: string | number;
}

export type BaseResponse = {
    responseCode: string;
    responseMessage: string;
    data?: any
}

export type BaseErrorResponse = {
    "type": string,
    "title": string,
    "status": number,
    "errors": {
        [key: string]: string[]
    },
    "traceId": string
}


export type ReadJson = {
    showAllFields: boolean,
    fields: [
        {
            key: string,
            label: string
        }
    ],
    readEndpoint: string,
    uniqueColId: string, // the unique field for the entity
}

export type ModuleJson = [
    {
        moduleName: string;
        moduleItems: [
            {
                title: string;
                tabRoute: string; // the route to the page to find the appropriate component
            }
        ]
    }
]

export type formJson = [
    {
        name: string,//fieldName,
        label: string,// custom display label
        valueDataType: string | number | boolean | object | null | undefined,
        inputType: | "button"
            | "checkbox"
            | "color"
            | "date"
            | "datetime-local"
            | "email"
            | "file"
            | "hidden"
            | "image"
            | "month"
            | "number"
            | "password"
            | "radio"
            | "range"
            | "reset"
            | "search"
            | "submit"
            | "tel"
            | "text"
            | "time"
            | "url"
            | "week" | "select"
    }
]


export type StatCardProps = {
    label: string;
    value: string;
    footerText: string;
    trend: string
}
export type LearnerDataProps = {
    name: string;
    type: string;
    course: string;
    dateEnrolled: string
    status: string
}
export type InvoiceDataProps = {
    id: string;
    client: string;
    amount: string;
    status: string
}
export type InstitutionDataProps = {
    organisation: string;
    segment: string;
    learners: string;
    plan: string;
}

export type FeaturedCardType = {
    image: string,
    title: string,
    duration: number,
    enrolled: number,
    rating: number,
    price: number
}

export type Category = {
    image?: string,
    title: string,
    // bootcamps: number
    // courses: number,
}

export type Testimonial = {
    comment: string,
    rating: number,
    name: string,
    role: string,
    company: string
}

export type DropdownType = {
    stringifyOption: string,
    options: any[],
    // label: string,
    filterTitle: string
    value: { title: string },
    setValue: React.Dispatch<React.SetStateAction<{ title: string }>>
}

export type RangeSliderType = {
    value: number[]
    setValue: React.Dispatch<React.SetStateAction<number[]>>
}

export type SliderType = {
    value: number
    setValue: React.Dispatch<React.SetStateAction<number>>
}

export type CheckboxType = {
    options: {
        label: string,
        key: string,
    }[],
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export type Location = {
    "type": string,
    "coordinates": [number, number],
    "street": string,
    "state": string,
    "country": string
}

export type CardType = {
    title: string,
    description: string,
    imageUrl: string,
    averageRating: number,
    averageTuition: number,
    coursesCount: number,
    location: Location[],
    primaryButtonText: string,
    secondaryButtonText?: string,
    primaryButtonClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    secondaryButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export type TextInputType = {
    startIcon?: ReactNode
    endIcon?: ReactNode
    placeholder: string
    name: string;
    formik: any
}

export type ButtonType = {
    text: string,
    className?: string,
    style?: CSSProperties,
    isLoading?: boolean,
    onClick: () => void
}

export type UserModalType = {
    editingUser: User | null,
    onClose: () => void,
    setUsers: React.Dispatch<React.SetStateAction<User[]>>
}