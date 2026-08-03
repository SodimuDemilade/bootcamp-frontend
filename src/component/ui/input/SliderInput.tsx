import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import type {SliderType} from "../../../util/type";
import {styled} from '@mui/material/styles';

export const StyledSlider = styled(Slider)({
    color: '#4F46E5'
})

export default function SliderInput({value, setValue}: SliderType) {

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
        console.log(event);
    };

    return (
        <Box sx={{width: '100%'}}>
            <StyledSlider
                size={"small"}
                defaultValue={value}
                aria-label="Default"
                valueLabelDisplay="auto"
                onChange={handleChange}
            />
        </Box>
    );
}