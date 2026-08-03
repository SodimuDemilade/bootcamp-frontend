import {ArrowRight, CodeXml} from "lucide-react";
import type {Category} from "@/util/type";
import {BootcampService} from "@/service/BootcampService.ts";

export const CategoryCard = ({title}: Category) => {
    const {data} = BootcampService.useReadBootcampQuery();
    const bootcamps = data?.data;
    const categoryBootcamps = bootcamps?.filter(bootcamp => bootcamp?.category?.some(cat => cat.toLowerCase() == title.toLowerCase()));

    return (
        <div className={"categoryCard"}>
            <div className={"categoryIcon"}>
                <CodeXml color={"#E5E7EB"}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '150px'}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <p className={"featuredCardTitle"}>{title}</p>
                    <p>{categoryBootcamps?.length || 0} bootcamps</p>
                </div>
                <ArrowRight/>
            </div>
        </div>
    )
}