import './BootcampListView.css';
import Dropdown from "../component/ui/input/Dropdown.tsx";
import {useState} from "react";
import {RangeSlider} from "../component/ui/input/RangeSlider.tsx";
import RadioButton from "../component/ui/input/RadioButton.tsx";
import BootcampCard from "../component/ui/card/BootcampCard.tsx";
import {useSelector} from "react-redux";
import {RootState} from "@/store";
import {categories} from "@/util/constants/data/CategoriesData.ts";
import {Bootcamp} from "@/model/response/bootcamp/BootcampResponse.ts";


export const BootcampListView = () => {
    const [price, setPrice] = useState<number[]>([0, 13000]);
    // const [location, setLocation] = useState<number>(50);
    const [duration, setDuration] = useState('');
    const [rating, setRating] = useState<string>('');
    const [category, setCategory] = useState<{ title: string }>({title: ""});
    const baseState = useSelector((state: RootState) => state.base);
    const [bootcamps, setBootcamps] = useState<Bootcamp[]>(baseState.bootcamps);
    // const {data: bootcamps, isLoading} = BootcampService.useReadBootcampQuery();

    // useEffect(() => {
    //     setBootcamps(baseState.bootcamps);
    // }, [baseState.bootcamps]);


    const setFilter = () => {
        let filtered = baseState.bootcamps;
        if (category.title) {
            filtered = filtered.filter(bootcamp => bootcamp.category.some(cat => cat.toLowerCase() === category?.title.toLowerCase()));
        }
        if (duration) {
            const durationSelectedFirst = Number(duration.split("-")[0]);
            const durationSelectedSecond = Number(duration.split("-")[1]);
            if (durationSelectedSecond == 0) {
                filtered = filtered.filter(bootcamp => {
                    const totalWeeks = bootcamp.courses.reduce((sum, course) => {
                        sum += course.weeks
                        return sum
                    }, 0);
                    return totalWeeks >= durationSelectedFirst;
                });
            } else {
                filtered = filtered.filter(bootcamp => {
                    const totalWeeks = bootcamp.courses.reduce((sum, course) => {
                        sum += course.weeks;
                        return sum;
                    }, 0);

                    return totalWeeks >= durationSelectedFirst && totalWeeks <= durationSelectedSecond;
                });
            }
        }
        if (price) {
            filtered = filtered.filter(bootcamp => (bootcamp.averageCost || 0) >= price[0] && (bootcamp.averageCost || 0) <= price[1]);
        }
        if (rating) {
            filtered = filtered.filter((bootcamp) => {
                return (bootcamp.averageRating ?? 0) >= Number(rating);
            });
        }
        setBootcamps(filtered);
    }

    const reset = () => {
        setDuration("");
        setCategory({title: ""});
        setRating("");
        setBootcamps(baseState.bootcamps);
    }

    return (
        <div className={"bootcampList"}>
            <div className={"filters"}>
                <div className={"filterTop"}>
                    <p style={{fontWeight: 600, fontSize: '18px'}}>Filter</p>
                    <p className={"resetButton"} onClick={reset}>Reset</p>
                </div>
                <div className={"filterGroup"}>
                    <label htmlFor={""} className={"filterLabel"}>Bootcamp Category</label>
                    <Dropdown stringifyOption={"title"} options={categories} filterTitle={"Category"} value={category}
                              setValue={setCategory}/>
                </div>
                {/*<div className={"filterGroup"}>*/}
                {/*    <label htmlFor={""} className={"filterLabel"}>Location Radius</label>*/}
                {/*    <SliderInput value={location} setValue={setLocation}/>*/}
                {/*</div>*/}
                <div className={"filterGroup"}>
                    <label htmlFor={""} className={"filterLabel"}>Average Tuition</label>
                    <RangeSlider value={price} setValue={setPrice}/>
                </div>
                <div className="filterGroup">
                    <label className="filterLabel">
                        Average Rating
                    </label>

                    <RadioButton
                        options={[
                            {label: "Any rating", key: "0"},
                            {label: "★★★★☆ & up", key: "4"},
                            {label: "★★★☆☆ & up", key: "3"},
                            {label: "★★☆☆☆ & up", key: "2"},
                            {label: "★☆☆☆☆ & up", key: "1"},
                        ]}
                        handleChange={(e) => {
                            setRating(e.target.value);
                        }}
                    />
                </div>
                <div className={"filterGroup"}>
                    <label htmlFor={""} className={"filterLabel"}>Bootcamp Duration</label>
                    <RadioButton options={[
                        {label: "1-4 weeks", key: "1-4"},
                        {label: "5-8 weeks", key: "5-8"},
                        {label: "9-12 weeks", key: "9-12"},
                        {label: "12+ weeks", key: "12-0"}
                    ]} handleChange={(e) => {
                        setDuration(e.target.value)
                    }}/>
                </div>

                <div style={{display: 'flex', justifyContent: 'right'}}>
                    <button onClick={setFilter} className={"primaryBtn"}>Filter</button>
                </div>
            </div>

            <div className={"bootcampListContent"}>
                <div className={"bootcamps"}>
                    {
                        bootcamps.length == 0 ? <p>No bootcamps</p> :
                            bootcamps.map((bootcamp) => (
                                <BootcampCard bootcamp={bootcamp}/>
                            ))
                    }
                </div>
            </div>
        </div>
    )
}


// import {useEffect, useState} from "react";
// import './BootcampListView.css'
//
//
// export function BootcampListView() {
//     const [word, setWord] = useState("");
//     const [guesses, setGuesses] = useState<string[]>([])
//     const [ended, setEnded] = useState("");
//     const guessWord = "spend";
//
//     // for (let i = 0; i < 5; i++) {
//     //     guess[i] = new Array(5).fill("");
//     // }
//
//     useEffect(() => {
//         if (word.length == 5) {
//             if (word.toLowerCase() == guessWord) setEnded("won");
//             else if (guesses.length == 5) setEnded("lost");
//             else {
//                 setGuesses((prev) => [...prev, word]);
//                 // setCount((prev) => prev + 1);
//             }
//         }
//     }, [word])
//
//     const status = (letter: string, index: number) => {
//         if (guessWord.includes(letter)) {
//             if (guessWord.indexOf(letter) == index) return "green";
//             return "yellow";
//         }
//         return "red";
//     }
//
//     // {ended && <p>You've lost!</p>}
//
//     return (
//         <>
//             {ended == "lost" ?
//                 <p>You've lost!</p> :
//                 ended == "won" ? <p>You've won!</p> :
//                     <div>
//                         <div>
//
//                             {
//                                 guesses.map((word) => {
//                                     return (
//                                         <div style={{display: 'flex'}}>
//                                             {
//                                                 word.split("").map((letter, index) => {
//                                                     return (
//                                                         <p className="guess-letter"
//                                                            style={{background: status(letter, index)}}>
//                                                             {letter}
//                                                         </p>
//                                                     )
//                                                 })
//                                             }
//                                         </div>
//                                     )
//
//
//                                 })
//                             }
//                         </div>
//                         <input value={word} onChange={(e) => setWord(e.target.value)}/>
//                     </div>
//             }
//         </>
//     )
// }