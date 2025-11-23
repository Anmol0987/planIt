"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for solo travelers and small groups",
    features: [
      "Up to 3 trips",
      "Basic itinerary builder",
      "Invite up to 5 friends",
      "Expense tracking",
    ],
    cta: "Get Started",
    popular: false,
  },
  //   {
  //     name: "Premium",
  //     price: "$12",
  //     period: "per month",
  //     description: "For frequent travelers and larger groups",
  //     features: [
  //       "Unlimited trips",
  //       "AI-powered suggestions",
  //       "Unlimited collaborators",
  //       "Advanced analytics",
  //       "Priority support",
  //       "Custom templates",
  //       "Export & share options",
  //     ],
  //     cta: "Start Free Trial",
  //     popular: true,
  //   },
];

export function Pricing() {
  const router = useRouter();
  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="mb-4">Simple, transparent pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose the plan that works best for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                plan.popular
                  ? "border-purple-500 shadow-lg shadow-purple-500/10"
                  : "border-gray-200"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-1 rounded-full text-sm shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-8">
                <h3 className="mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-5xl tracking-tight text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-500">/ {plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              {/* Features list */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                type="button"
                onClick={() => router.push("/login")}
                className={`w-full rounded-full ${
                  plan.popular ? "shadow-lg shadow-purple-500/25" : ""
                }`}
                variant={plan.popular ? "default" : "outline"}
                size="lg"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
