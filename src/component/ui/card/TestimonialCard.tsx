import {Rating} from "../rating.tsx";
import type {Testimonial} from "../../../util/type";

export const TestimonialCard = ({comment, rating, name, role, company}: Testimonial) => {
    return (
        <div className={"testimonialCard"}>
            <Rating rating={rating}/>
            <p>"{comment}"</p>
            <div className={"testimonialProfile"}>
                <div className={"testimonialProfileName"}>
                    {name.split(" ")[0][0]}{name.split(" ")[1][0]}
                </div>
                <div>
                    <p style={{fontWeight: 600}}>{name}</p>
                    <p>{role} @ {company}</p>
                </div>
            </div>
        </div>
    )
}