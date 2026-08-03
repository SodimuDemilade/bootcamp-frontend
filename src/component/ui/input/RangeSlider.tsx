import Box from '@mui/material/Box';
import type {RangeSliderType} from "@/util/type";
import {StyledSlider} from "./SliderInput.tsx";

export const RangeSlider = ({value, setValue}: RangeSliderType) => {
    // const [value, setValue] = useState<number[]>([20, 37]);

    function valuetext(value: number) {
        return `$${value}`;
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        console.log(event);
    };

    return (
        <Box sx={{width: '100%'}}>
            <StyledSlider
                size={"small"}
                getAriaLabel={() => 'Price range'}
                value={value}
                min={0}
                max={13000}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
            />
        </Box>
    )
}