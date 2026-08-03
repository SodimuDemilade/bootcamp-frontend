import {Clock, Users} from "lucide-react";
import {Rating} from "../rating.tsx";
import {Bootcamp} from "@/model/response/bootcamp/BootcampResponse.ts";
import {EnrollmentService} from "@/service/EnrollmentService.ts";
import {ReviewService} from "@/service/ReviewService.ts";
import {useNavigate} from "react-router-dom";

export const FeaturedCard = (bootcamp: Bootcamp) => {
    const navigate = useNavigate();
    const {data: enrollments} = EnrollmentService.useReadBootcampEnrollmentQuery(bootcamp ? bootcamp.id : "");
    const {data: reviews} = ReviewService.useReadReviewQuery(bootcamp.id);

    const totalWeeks = bootcamp.courses.reduce((sum, course) => {
        sum += course.weeks
        return sum
    }, 0);


    return (
        <div className={"featuredCard"}>
            <div className={"featuredCardTop"}>
                <img src={"/images/webDev.jpg"} alt={"not found"}/>
            </div>
            <div className={"featuredCardBottom"}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
                    <p className={"featuredCardTitle"} onClick={() => {
                        localStorage.activeBootcamp = bootcamp;
                        navigate(`/bootcamp/${bootcamp.id}`, {
                            state: {
                                bootcamp
                            }
                        })
                    }}>{bootcamp.name}</p>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div className={"featuredTime"}>
                                <Clock size={15} style={{paddingTop: '4px'}}/>
                                <p>{totalWeeks} weeks</p>
                            </div>
                            <div className={"featuredTime"}>
                                <Users size={15}/>
                                <p>{enrollments?.data.length} enrolled</p>
                            </div>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <Rating rating={bootcamp.averageRating}/>
                            <p>{bootcamp.averageRating?.toFixed(2)} ({reviews?.data.length} reviews)</p>
                        </div>
                    </div>
                </div>
                <p className={"featuredCardTitle"}>${bootcamp.averageCost || 0}</p>
            </div>
        </div>
    )
}
