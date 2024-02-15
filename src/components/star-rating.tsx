import React from 'react'

interface StarRatingProps {
  rate: number
}

const StarRating: React.FC<StarRatingProps> = ({ rate }) => {
  const filledStars = Math.round(rate)
  const emptyStars = 5 - filledStars

  return (
    <div className="flex">
      {[...Array(filledStars)].map((_, index) => (
        <span key={index} className="text-indigo-900">
          ★
        </span>
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <span key={index} className="text-gray-300">
          ★
        </span>
      ))}
    </div>
  )
}

export default StarRating
