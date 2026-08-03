import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import type {CheckboxType} from "@/util/type";

export default function RadioButton({options, handleChange}: CheckboxType) {
    const id = React.useId();

    return (
        <FormControl>
            {/*<FormLabel id={`${id}-label`}>Gender</FormLabel>*/}
            <RadioGroup
                aria-labelledby={`${id}-label`}
                name="controlled-radio-buttons-group"
                // value={value}
                onChange={handleChange}
            >
                {
                    options.map((option) => (
                        <FormControlLabel
                            value={option.key}
                            control={
                                <Radio
                                    size={"small"}
                                    sx={{
                                        color: "#CBD5E1",
                                        "&.Mui-checked": {
                                            color: "#4F46E5",
                                        },
                                        padding: "6px",
                                    }}
                                />
                            }
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
            </RadioGroup>
        </FormControl>
    );
}
