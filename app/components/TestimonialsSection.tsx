import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      rating: 5,
      text: "Aatrey's amla powder has been a game-changer for my family's health. The quality is exceptional and you can taste the freshness. My immunity has improved significantly since I started using their products regularly.",
      product: "Organic Amla Powder",
    },
    {
      id: 2,
      name: "Rajesh Patel",
      location: "Ahmedabad, Gujarat",
      rating: 5,
      text: "I've been buying multigrain atta from Aatrey for over a year now. The flour is perfectly ground and makes the softest rotis. It's great to know I'm feeding my family something pure and healthy.",
      product: "Multigrain Atta",
    },
    {
      id: 3,
      name: "Dr. Meena Iyer",
      location: "Bangalore, Karnataka",
      rating: 5,
      text: "As an Ayurvedic practitioner, I recommend Aatrey's herbal powders to my patients. Their ashwagandha and tulsi powders are of pharmaceutical grade quality. Truly impressed with their commitment to purity.",
      product: "Ashwagandha Powder",
    },
  ]

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4">What Our Customers Say</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what real customers have to say about their Aatrey experience and
            how our products have made a difference in their lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow duration-300 bg-white">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 md:w-8 md:h-8 text-green-200" />
                </div>

                <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6 leading-relaxed italic">"{testimonial.text}"</p>

                <div className="border-t pt-3 md:pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm md:text-base">{testimonial.name}</h4>
                      <p className="text-xs md:text-sm text-gray-600">{testimonial.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-green-600 font-medium">Verified Purchase</p>
                      <p className="text-xs text-gray-500">{testimonial.product}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <div className="inline-flex items-center space-x-2 bg-green-50 px-4 md:px-6 py-2 md:py-3 rounded-full">
            <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" />
            <span className="font-semibold text-green-700 text-sm md:text-base">4.6/5 Average Rating</span>
            <span className="text-gray-600 text-xs md:text-sm">from 500+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  )
}
