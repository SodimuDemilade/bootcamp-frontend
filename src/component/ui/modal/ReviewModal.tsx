import {useState} from "react";
import {Star, X} from "lucide-react";
import "./ReviewModal.css";
import {BaseButton} from "@/component/ui/input/BaseButton.tsx";

type ReviewModalProps = {
    open: boolean;
    onClose: () => void;
    // edit: boolean;
    formData?: { rating?: number, review?: string, title?: string };
    onSubmit: (rating: number, review: string, title: string) => void;
    loading: boolean
};

export default function ReviewModal({
                                        open,
                                        onClose,
                                        // edit,
                                        formData,
                                        onSubmit,
                                        loading
                                    }: ReviewModalProps) {
    const [rating, setRating] = useState(formData?.rating || 0);
    const [hoveredStar, setHoveredStar] = useState(0);
    const [review, setReview] = useState(formData?.review || "");
    const [title, setTitle] = useState(formData?.title || "");

    if (!open) return null;

    const handleSubmit = async () => {
        if (!rating) {
            alert("Please select a rating.");
            return;
        }

        if (!review.trim()) {
            alert("Please write a review.");
            return;
        }

        await onSubmit(rating, review, title);

        setRating(0);
        setTitle("");
        setReview("");
    };

    return (
        <div className="modalOverlay">

            <div className="reviewModal">

                <button
                    className="closeButton"
                    onClick={onClose}
                >
                    <X size={20}/>
                </button>

                <h2>{formData ? "Edit Review" : "Leave a Review"}</h2>

                <p className="reviewLabel">
                    How would you rate this bootcamp?
                </p>

                <div className="starContainer">

                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={34}
                            className={`star ${
                                star <= (hoveredStar || rating)
                                    ? "active"
                                    : ""
                            }`}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(0)}
                            onClick={() => setRating(star)}
                        />
                    ))}

                </div>

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label className="reviewLabel">
                    Your Review
                </label>

                <textarea
                    placeholder="Share your experience with future students..."
                    maxLength={500}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />

                <p className="characterCount">
                    {review.length} / 500
                </p>

                <div className="reviewActions">

                    <button
                        className="cancelButton"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <BaseButton
                        className="submitButton"
                        onClick={handleSubmit}
                        isLoading={loading}
                        text={"Submit Review"}
                    />

                </div>

            </div>

        </div>
    );
}