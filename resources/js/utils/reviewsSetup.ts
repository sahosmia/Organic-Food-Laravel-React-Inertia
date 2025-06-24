import { ReviewType } from "@/types";

const calculateAverageRating = (reviews: ReviewType[]): number => {
    if (!reviews || reviews.length === 0) {
        return 0;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);

    return Math.round(totalRating / reviews.length);
};

export { calculateAverageRating };
