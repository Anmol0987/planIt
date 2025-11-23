import { MapPin, Calendar, Users, Sparkles } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Trip Creation",
    description: "Create, edit, and manage trips with intuitive forms and smart templates.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: MapPin,
    title: "Itinerary Builder",
    description: "Build daily schedules with activities, notes, maps, and location tracking.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Invite friends, chat in real-time, and share polls for group decisions.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Sparkles,
    title: "Smart Suggestions",
    description: "AI-powered recommendations for destinations, activities, and optimal routes.",
    color: "bg-orange-100 text-orange-600",
  },
];

export function Features() {
  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">Everything you need to plan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Powerful features designed to make travel planning seamless and collaborative
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-xl hover:border-gray-300 transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="mb-3">{feature.title}</h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
