import { ImageWithFallback } from "./ImageWithFallback";
import { CheckCircle2, DollarSign, MessageSquare, TrendingUp } from "lucide-react";

const mockScreens = [
  {
    title: "Trip Dashboard",
    description: "Visualize your entire trip at a glance with smart cards and quick actions",
    icon: TrendingUp,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Poll Creation",
    description: "Make group decisions easy with polls for destinations, dates, and activities",
    icon: CheckCircle2,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Activity Suggestions",
    description: "AI-powered recommendations based on your preferences and travel style",
    icon: MessageSquare,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Expense Tracker",
    description: "Split costs, track budgets, and manage group expenses effortlessly",
    icon: DollarSign,
    color: "from-orange-500 to-orange-600",
  },
];

export function InteractiveScreens() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">Designed for modern travelers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Beautiful, intuitive interfaces that make planning feel effortless
          </p>
        </div>

        {/* Main showcase image - smaller size */}
        <div className="mb-16 relative max-w-xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-200/20 to-blue-200/20 rounded-3xl blur-3xl" />
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-3 sm:p-4 border border-gray-200/50 shadow-2xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1629697776809-f37ceac39e77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBtb2NrdXB8ZW58MXx8fHwxNjM4MTYzODN8MA&ixlib=rb-4.1.0&q=80&w=600"
              alt="Travel Planning Interface"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockScreens.map((screen, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${screen.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative">
                <div className={`w-12 h-12 bg-gradient-to-br ${screen.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <screen.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="mb-3">{screen.title}</h3>
                <p className="text-gray-600">{screen.description}</p>
              </div>

              {/* Mock UI elements */}
              <div className="mt-6 space-y-2">
                <div className="h-2 bg-gray-100 rounded-full w-full" />
                <div className="h-2 bg-gray-100 rounded-full w-3/4" />
                <div className="h-2 bg-gray-100 rounded-full w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}