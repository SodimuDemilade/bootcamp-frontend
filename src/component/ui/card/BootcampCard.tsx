//
// export default function BootcampCard({bootcamps}: { bootcamps: Bootcamp[] }) {
//
//     const navigate = useNavigate();
//
//     return (
//         bootcamps.map((bootcamp) => (
//
//             <BaseCard
//                 title={bootcamp.name}
//                 description={bootcamp.description}
//                 imageUrl={bootcamp.photo}
//                 averageRating={bootcamp.averageRating}
//                 averageTuition={bootcamp.averageCost}
//                 coursesCount={bootcamp.courses.length}
//                 location={bootcamp.location}
//                 primaryButtonText={"View details"}
//                 primaryButtonClick={() => navigate(RouteConstant.dashboard.landing.path)}
//             />
//         ))
//     );
// }


import type {Bootcamp} from "@/model/response/bootcamp/BootcampResponse.ts";
import './BootcampCard.css';
import {Rating} from "../rating.tsx";
import {StringUtil} from "@/util/stringUtil.ts";
import {useNavigate} from "react-router-dom";

export default function BootcampCard({bootcamp}: { bootcamp: Bootcamp }) {
    const navigate = useNavigate();
    return (
        <div className="bootcampCard">

            {/* Image */}
            <div className="bootcampImageContainer">
                <img
                    src={'/images/webDev.jpg'}
                    alt="Bootcamp"
                    className="bootcampImage"
                />

                {/* Badges */}
                <div className="bootcampBadges">
                    <div className="featuredBadge">
                        Featured
                    </div>

                    <div className="remoteBadge">
                        Remote
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="bootcampContent">

                {/* Top */}
                <div className="bootcampTop">

                    <div className="bootcampTitleSection">
                        <h3 className="bootcampTitle">
                            {bootcamp.name}
                        </h3>

                        {/*<p className="bootcampSchool">*/}
                        {/*    TechLaunch Academy*/}
                        {/*</p>*/}
                    </div>

                    <div className="bootcampPrice">
                        {bootcamp.averageCost ? `$ ${StringUtil.handleCurrencyFormatter(String(bootcamp.averageCost))}` : 'No course yet'}
                    </div>

                </div>

                {/* Description */}
                <p className="bootcampDescription">
                    {bootcamp.description}
                </p>

                {/* Rating */}
                <div className="bootcampMeta">

                    <div className="bootcampRating">
                        <Rating rating={bootcamp.averageRating}/>

                        <p className="ratingText">
                            {bootcamp.averageRating?.toFixed(2) || "- -"}
                        </p>
                    </div>

                    <div className="bootcampDuration">
                        <div className="durationDot"></div>
                        <p>{bootcamp.courses.length} Courses</p>
                    </div>

                </div>

                {/* Tags */}
                <div className="bootcampTags">

                    {/*{[*/}
                    {/*    'Frontend',*/}
                    {/*    'Backend',*/}
                    {/*    'React',*/}
                    {/*    'Node.js',*/}
                    {/*    'AWS'*/}
                    {/*].map((tag) => (*/}
                    {/*    <div*/}
                    {/*        key={tag}*/}
                    {/*        className="bootcampTag"*/}
                    {/*    >*/}
                    {/*        {tag}*/}
                    {/*    </div>*/}
                    {/*))}*/}
                    <p>{bootcamp.address}</p>

                </div>

                {/* Footer */}
                <div className="bootcampFooter">

                    {/*<div>*/}
                    {/*    <p className="careerLabel">*/}
                    {/*        Career Outcome*/}
                    {/*    </p>*/}

                    {/*    <p className="careerValue">*/}
                    {/*        Software Engineer*/}
                    {/*    </p>*/}
                    {/*</div>*/}

                    <button className="viewProgramButton" onClick={() => {
                        localStorage.activeBootcamp = bootcamp;
                        navigate(`/bootcamp/${bootcamp.id}`, {
                            state: {
                                bootcamp
                            }
                        })
                    }}>
                        View Program
                    </button>

                </div>

            </div>

        </div>
    );
}
