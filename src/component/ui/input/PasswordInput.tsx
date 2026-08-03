import {IconButton, InputAdornment, OutlinedInput} from "@mui/material"
import React, {useId, useState} from "react";
import {TextInputType} from "@/util/type";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const PasswordInput = ({startIcon, placeholder, name, formik}: TextInputType) => {
    const outlinedId = useId();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };


    return (
        <OutlinedInput
            size="small"
            sx={{
                "& .MuiInputBase-input": {
                    fontSize: "14px",
                    // backgroundColor: '#F3F6F9',
                },
            }}
            type={showPassword ? 'text' : 'password'}
            id={`${outlinedId}-input`}
            placeholder={placeholder}
            startAdornment={<InputAdornment position={"start"}>{startIcon}</InputAdornment>}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label={
                            showPassword ? 'hide the password' : 'display the password'
                        }
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                </InputAdornment>
            }
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