import { Quote } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TestimonialProps {
    quote: string;
    name: string;
    role: string;
}

function TestimonialCard({ quote, name, role }: TestimonialProps) {
    return (
        <Card className="bg-white border-0 shadow-lg p-8 flex flex-col justify-between h-full">
            <div>
                <Quote className="w-8 h-8 text-emerald/20 mb-4 rotate-180" />
                <p className="text-base text-charcoal/80 leading-relaxed italic">
                    &ldquo;{quote}&rdquo;
                </p>
            </div>
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-beige">
                <div className="w-10 h-10 rounded-full bg-emerald/10 flex items-center justify-center">
                    <span className="font-serif text-sm font-bold text-emerald">
                        {name.charAt(0)}
                    </span>
                </div>
                <div>
                    <p className="font-semibold text-charcoal text-sm">{name}</p>
                    <p className="text-charcoal/50 text-xs">{role}</p>
                </div>
            </div>
        </Card>
    );
}

export default function TestimonialsSection() {
    const testimonials: TestimonialProps[] = [
        {
            quote: "Удаан хугацааны нуруу өвдөлттэй явсан. 10 хоног эмчилгээ хийлгэснээр өвдөлт маш их буурсан. Эмч, ажилтнууд маш эелдэг, анхаарал тавьсан.",
            name: "Б. Тунгалаг",
            role: "Улаанбаатар",
        },
        {
            quote: "Хүүхдүүддээ бэлэглээд ирснээс хойш жил бүр ирдэг болсон. Рашаан, шавар эмчилгээ нь миний биед маш тохирсон. Амрах таатай орчин.",
            name: "Ч. Мөнхцэцэг",
            role: "Өвөрхангай",
        },
        {
            quote: "Үе мөчний өвчнөөс болж хөдөлж чадахгүй байсан. Энд ирээд физик эмчилгээ хийлгэснээр амьдрал минь өөрчлөгдсөн. Баярлалаа.",
            name: "Д. Сүрэн",
            role: "Дархан-Уул",
        },
    ];

    return (
        <section id="testimonials" className="py-16 sm:py-24 bg-cream">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal font-bold">
                        Үйлчлүүлэгчийн сэтгэгдэл
                    </h2>
                    <div className="flex justify-center items-center gap-3 mt-6">
                        <div className="w-16 h-[1px] bg-emerald/30" />
                        <div className="w-2 h-2 rounded-full bg-emerald" />
                        <div className="w-16 h-[1px] bg-emerald/30" />
                    </div>
                </div>

                {/* Testimonial cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
}
