import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import type {DropdownType} from "@/util/type";

export default function Dropdown({stringifyOption, options, filterTitle, value, setValue}: DropdownType) {

    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option: any) => option[stringifyOption],
    });

    const handleChange = (event: any, newValue: { title: string }) => {
        setValue(newValue);
        console.log(event);
    };

    return (
        <Autocomplete
            value={value}
            onChange={handleChange}
            size={"small"}
            options={options}
            getOptionLabel={(option) => option[stringifyOption]}
            filterOptions={filterOptions}
            sx={{
                width: '100%',
                "& .MuiInputBase-root": {
                    height: 40,
                    fontSize: "14px",
                },
                "& .MuiInputLabel-root": {
                    fontSize: "14px",
                },
            }}
            renderInput={(params) => <TextField {...params} label={filterTitle}/>}
        />
    );
}