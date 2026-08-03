import {InputAdornment, OutlinedInput} from "@mui/material"
import {useId} from "react";
import {TextInputType} from "@/util/type";

export const TextInput = ({startIcon, endIcon, placeholder, name, formik}: TextInputType) => {
    const outlinedId = useId();


    return (
        <OutlinedInput
            size="small"
            sx={{
                "& .MuiInputBase-input": {
                    fontSize: "14px",
                    // backgroundColor: '#F3F6F9',
                },
            }}
            id={`${outlinedId}-input`}
            placeholder={placeholder}
            startAdornment={<InputAdornment position={"start"}>{startIcon}</InputAdornment>}
            endAdornment={<InputAdornment position="end">{endIcon ? endIcon : ''}</InputAdornment>}
            aria-describedby={`${outlinedId}-helper-text`}
            // inputProps={{
            //     'aria-label': 'weight',
            // }}
            onChange={(e) => {
                formik.setFieldValue(name, e.target.value)
            }}
        />
    )
}