import { Star, ThumbsUp, BadgeCheck } from 'lucide-react';
import { Review } from '../../types';
import { formatDate } from '../../utils/helpers';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900">{review.userName}</h4>
            {review.verified && (
              <BadgeCheck className="w-4 h-4 text-green-500" />
            )}
          </div>
          <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating ? 'text-[#F9B233] fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
      <p className="text-gray-600 leading-relaxed">{review.comment}</p>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#F9B233] transition-colors">
          <ThumbsUp className="w-4 h-4" />
          <span>Helpful ({review.helpful})</span>
        </button>
        <button className="text-sm text-gray-500 hover:text-red-500 transition-colors">
          Report
        </button>
      </div>
    </div>
  );
}
