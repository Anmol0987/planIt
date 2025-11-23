import { PlusCircle, Users, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: PlusCircle,
    title: "Create your trip",
    description: "Start with a destination, dates, and let AI help you build the perfect foundation.",
    color: "bg-purple-100 text-purple-600",
    borderColor: "border-purple-200",
  },
  {
    number: "02",
    icon: Users,
    title: "Add activities & invite friends",
    description: "Build your itinerary with smart suggestions and collaborate with your travel group.",
    color: "bg-blue-100 text-blue-600",
    borderColor: "border-blue-200",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Plan together & finalize",
    description: "Vote on activities, manage expenses, and finalize your perfect trip itinerary.",
    color: "bg-green-100 text-green-600",
    borderColor: "border-green-200",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">How it works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Three simple steps to your perfect trip
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connection lines for desktop */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-purple-200 via-blue-200 to-green-200" />
          
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step card */}
              <div className="text-center relative z-10">
                {/* Number badge */}
                <div className="inline-flex items-center justify-center mb-6">
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center shadow-lg relative`}>
                    <step.icon className="w-8 h-8" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="text-sm text-gray-400">{step.number}</div>
                  <h3>{step.title}</h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Vertical connector for mobile */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center my-8">
                  <div className="w-0.5 h-12 bg-gradient-to-b from-gray-200 to-gray-100" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
