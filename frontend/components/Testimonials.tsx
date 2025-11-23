import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Travel Blogger",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjM4MTM5ODJ8MA&ixlib=rb-4.1.0&q=80&w=400",
    initials: "SC",
    quote: "PlanIt reduced our planning time from weeks to just a few hours. The AI suggestions were spot-on!",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    initials: "MR",
    quote: "Finally, a tool that makes group travel planning actually enjoyable. The collaboration features are incredible.",
    rating: 5,
  },
  {
    name: "Emily Thompson",
    role: "Entrepreneur",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    initials: "ET",
    quote: "The expense tracking alone is worth it. We saved so much time managing our group budget.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">Loved by travelers worldwide</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            See what our users are saying about their experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Rating stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 mb-8 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border-2 border-gray-100">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}