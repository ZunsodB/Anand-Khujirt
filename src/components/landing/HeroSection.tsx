import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
    return (
        <section id="hero" className="relative w-full h-screen min-h-[600px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/back.png"
                    alt="Ананд Хужирт Сувилал"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-start max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    {/* Main headline */}
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase tracking-wide leading-tight animate-fade-in-up">
                        ЭРҮҮЛЭЭР
                        <br />
                        <span className="text-blue">УРТ НАСЛАЯ</span>
                    </h1>

                    {/* Year badge */}
                    <div className="mt-4 inline-flex items-center gap-2 animate-fade-in-up animation-delay-400">
                        <div className="w-8 h-[1px] bg-white" />
                        <span className="text-white text-sm tracking-[0.3em] uppercase">
                            Рашаан, шавар эмчилгээ
                        </span>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-10 animate-fade-in-up animation-delay-600">
                        <Button asChild className="bg-emerald hover:bg-emerald-dark text-white text-lg font-semibold px-10 h-[56px] rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-emerald/30 hover:-translate-y-0.5">
                            <a href="/booking" id="hero-booking-btn" className="inline-flex items-center gap-2">
                                Захиалга өгөх
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
        </section>
    );
}
