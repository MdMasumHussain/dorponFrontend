import { Star } from "lucide-react";

export default function StarRating({ rating, max = 5 }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = max - fullStars - (halfStar ? 1 : 0);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="#facc15" />
    );
  }

  if (halfStar) {
    stars.push(
      <Star
        key="half"
        className="w-5 h-5 text-yellow-400"
        style={{ clipPath: "inset(0 50% 0 0)" }}
        fill="#facc15"
      />
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="none" />
    );
  }

  return <div className="flex" aria-label={`Rated ${rating} out of ${max}`}>{stars}</div>;
}
