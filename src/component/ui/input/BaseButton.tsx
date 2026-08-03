import {RotatingLines} from "react-loader-spinner";
import {ButtonType} from "@/util/type";

export const BaseButton = ({isLoading, text, className, style, onClick}: ButtonType) => {
    return (
        <button
            className={`button ${className || ""}`}
            style={{...style}}
            onClick={onClick}
            type={"button"}
        >
            {isLoading ?
                <p><RotatingLines
                    visible={true}
                    width="20"
                    height="20"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{display: "flex"}}
                /></p> :
                text
            }
        </button>
    )
}