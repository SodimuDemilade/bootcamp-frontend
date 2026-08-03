import {Star} from "lucide-react";

export const Rating = ({rating, fill, color}: { rating: number, fill?: string, color?: string }) => {
    return (
        <div style={{display: 'flex', gap: '1px'}}>
            {
                [...Array(5)].map((_, index) => (
                    <Star
                        key={index}
                        size={15}
                        fill={index < Math.round(rating) ? (fill ? fill : '#FACC15') : 'none'}
                        color={index < Math.round(rating) ? (color ? color : '#FACC15') : '#CBD5E1'}
                    />
                ))
            }
        </div>
    )
}