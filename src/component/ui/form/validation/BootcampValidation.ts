import * as Yup from 'yup';

export class BootcampValidation {
    static emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    static specialCharactersRegex = /^[a-zA-Z0-9 ]+$/;
    static create = Yup.object().shape({
        name: Yup.string().required("Name Is Required."),
        description: Yup.string().required("Description Is Required."),
        website: Yup.string().required("Website Is Required."),
        phone: Yup.string().required("Phone Number Is Required."),
        email: Yup.string().matches(this.emailRegex, 'Invalid email address').required("Email Is Required."),
        address: Yup.string().required("Website Is Required."),
        careers: Yup.array().required("Career is required"),
    })
}