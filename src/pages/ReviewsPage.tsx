import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, BadgeCheck, Filter } from 'lucide-react';
import { reviews } from '../data';
import { ReviewCard } from '../components';

export function ReviewsPage() {
  const [filter, setFilter] = useState<number | null>(null);

  const filteredReviews = filter
    ? reviews.filter((r) => r.rating === filter)
    : reviews;

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100,
  }));

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#FFF4D6] to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Customer Reviews
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what our customers are saying about SUNSCREEN products
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <p className="text-6xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < Math.floor(averageRating) ? 'text-[#F9B233] fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{reviews.length} reviews</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <button
                  key={rating}
                  onClick={() => setFilter(filter === rating ? null : rating)}
                  className={`flex items-center gap-3 w-full ${
                    filter === rating ? 'bg-[#FFF4D6]' : ''
                  } rounded-lg p-2 transition-colors`}
                >
                  <span className="text-sm text-gray-600 w-8">{rating} star</span>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F9B233] rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-500 w-8">{count}</span>
                </button>
              ))}
              {filter && (
                <button
                  onClick={() => setFilter(null)}
                  className="text-sm text-[#F9B233] mt-2 hover:underline"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No reviews found for this filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Write Review CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Share Your Experience
          </h2>
          <p className="text-gray-600 mb-6">
            Tried one of our products? We would love to hear your thoughts!
          </p>
          <button className="px-8 py-4 bg-[#F9B233] text-white rounded-full font-semibold hover:bg-[#FF8A00] transition-colors">
            Write a Review
          </button>
        </div>
      </section>
    </div>
  );
}
