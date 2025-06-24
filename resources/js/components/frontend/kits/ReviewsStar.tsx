import { ReviewType } from '@/types';
import { calculateAverageRating } from '@/utils/reviewsSetup';
import React from 'react'

const ReviewsStar = ({ reviews }: { reviews: ReviewType[] }) => {


    const averageRating = calculateAverageRating(reviews);
    return (
        <ul className="flex" aria-label={`Average rating: ${averageRating} out of 5 stars`}>
            {Array.from({ length: averageRating }, (_, i) => (
                <li key={`filled-star-${i}-${i}`} className="text-yellowca">
                    <i className="fa-solid fa-star"></i>
                </li>
            ))}

            {Array.from({ length: 5 - averageRating }, (_, i) => (
                <li key={`empty-star-${i}-${i}`} className="text-gray-300">
                    <i className="fa-solid fa-star"></i>
                </li>
            ))}
        </ul>
    )
}

export default ReviewsStar
