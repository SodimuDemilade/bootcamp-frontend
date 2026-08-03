import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import type {CheckboxType} from "../../../util/type";

export default function CheckboxInput({options, handleChange}: CheckboxType) {
    return (
        <FormGroup>
            {
                options.map((option) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                size={"small"}
                                onChange={handleChange}
                                sx={{
                                    color: "#CBD5E1",
                                    "&.Mui-checked": {
                                        color: "#4F46E5",
                                    },
                                    padding: "6px",
                                }}
                            />}
                        label={option.label}
                        sx={{
                            margin: 0,
                            gap: "1px",

                            "& .MuiTypography-root": {
                                fontSize: "14px",
                                color: "#0F172A",
                            },
                        }}
                    />
                ))
            }
            {/*<FormControlLabel required control={<Checkbox/>} label="Required"/>*/}
            {/*<FormControlLabel disabled control={<Checkbox/>} label="Disabled"/>*/}
        </FormGroup>
    );
}
