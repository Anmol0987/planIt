"use client"
import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { useRouter } from "next/navigation";

export function Hero() {
    const router = useRouter()
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background with cut-out shape */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        {/* Modern blob cut-out shape */}
        <div className="absolute top-0 right-0 w-full h-full">
          <svg
            className="absolute top-0 right-0 w-2/3 h-full opacity-40"
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#a855f7", stopOpacity: 0.1 }} />
                <stop offset="100%" style={{ stopColor: "#3b82f6", stopOpacity: 0.1 }} />
              </linearGradient>
            </defs>
            <path
              fill="url(#heroGradient)"
              d="M 0 100 Q 200 0 400 100 T 800 100 L 800 800 L 0 800 Z"
            />
          </svg>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="relative z-10 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-purple-200/50 rounded-full shadow-sm mb-6">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-xs text-purple-900">AI-powered travel planning</span>
            </div>

            {/* Headline */}
            <h1 className="mb-5 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-700 bg-clip-text text-transparent">
              Plan trips effortlessly with AI.
            </h1>

            {/* Sub-headline */}
            <p className="mb-8 text-gray-600 max-w-xl mx-auto lg:mx-0 text-lg">
              Create smart itineraries, collaborate with friends, track expenses, and manage every detail in one place.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center">
              <Button  type="button" 
  onClick={() => router.push("/login")} size="lg" className="rounded-full px-8 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all">
                Start Planning
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
              <div>
                <div className="text-2xl text-gray-900 mb-1">10K+</div>
                <div className="text-sm text-gray-500">Active Users</div>
              </div>
              <div>
                <div className="text-2xl text-gray-900 mb-1">50K+</div>
                <div className="text-sm text-gray-500">Trips Planned</div>
              </div>
              <div>
                <div className="text-2xl text-gray-900 mb-1">4.9★</div>
                <div className="text-sm text-gray-500">User Rating</div>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Image with cut-out design */}
          <div className="relative z-10">
            {/* Main mockup with modern cut-out */}
            <div className="relative">
              {/* Decorative background shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-[3rem] rotate-6 scale-105 blur-2xl" />
              
              {/* Main image container */}
              <div className="relative bg-white/50 backdrop-blur-sm rounded-[2.5rem] p-2 shadow-2xl border border-white/50">
                <div className="rounded-[2.25rem] overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1717323454555-f053c31ff4b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHAlMjBpbnRlcmZhY2UlMjBzY3JlZW58ZW58MXx8fHwxNzYzODgzOTgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="PlanIt App Interface"
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* Floating mini cards with modern design */}
              <div className="absolute -bottom-6 -left-6 lg:-left-8 z-20">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 border border-gray-100 transform hover:scale-105 transition-transform duration-300 w-40">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-lg">🌴</span>
                    </div>
                    <div className="flex-1">
                      <div className="h-1.5 w-16 bg-gray-300 rounded-full mb-1.5" />
                      <div className="h-1.5 w-12 bg-gray-200 rounded-full" />
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-500">Bali Trip • 7 days</div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 lg:-right-8 z-20">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 border border-gray-100 transform hover:scale-105 transition-transform duration-300 w-40">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-lg">✈️</span>
                    </div>
                    <div className="flex-1">
                      <div className="h-1.5 w-16 bg-gray-300 rounded-full mb-1.5" />
                      <div className="h-1.5 w-12 bg-gray-200 rounded-full" />
                    </div>
                  </div>
                  <div className="text-[10px] text-gray-500">Next Activity • 2h</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave cut-out */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 sm:h-24"
          viewBox="0 0 1440 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,50 Q360,20 720,50 T1440,50 L1440,100 L0,100 Z"
          />
        </svg>
      </div>
    </section>
  );
}
