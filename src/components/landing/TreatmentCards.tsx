import Image from "next/image";
import { Card } from "@/components/ui/card";

interface TreatmentCardProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    reverse?: boolean;
}

function TreatmentCard({
    title,
    description,
    imageSrc,
    imageAlt,
    reverse = false,
}: TreatmentCardProps) {
    return (
        <div
            className={`relative flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-0 lg:gap-0 my-8 lg:my-16`}
        >
            {/* Image side */}
            <div
                className={`relative w-full lg:w-[55%] h-[300px] sm:h-[360px] lg:h-[420px] rounded-2xl overflow-hidden shadow-xl ${reverse ? "lg:ml-[-40px]" : "lg:mr-[-40px]"
                    }`}
            >
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Card content */}
            <Card
                className={`relative w-full lg:w-[50%] bg-white border-0 shadow-2xl p-8 sm:p-10 z-10 mt-[-40px] lg:mt-0 mx-4 lg:mx-0 ${reverse ? "lg:mr-[-40px]" : "lg:ml-[-40px]"
                    }`}
            >
                {/* Title */}
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal mb-4">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-base sm:text-lg text-charcoal/70 leading-relaxed">
                    {description}
                </p>
            </Card>
        </div>
    );
}

export default function TreatmentCards() {
    const treatments = [
        {
            title: "Рашаан эмчилгээ",
            description:
                "Рашаанд орох үед түүний найрлага дахь азот, ус төрөгч, хүхэрт устөрөгч, цахиурын нэгдэл арьсаар нэвтэрснээр бие махбодын цусны эргэлтийн үйл ажиллагааг сайжруулж, дархлааг дэмжиж хүний сэтгэл санааг тогтуун болгож амраадаг.",
            imageSrc: "/images/mineral-water.png",
            imageAlt: "Рашаан эмчилгээ - Байгалийн халуун рашаан",
            reverse: false,
        },
        {
            title: "Шавар эмчилгээ",
            description:
                "Эмчилгээний шаварт агуулагдах эрдэс давсууд арьсаар нэвтрэн шимэгдэн, үе мөчний үрэвсэл, хаванг буруулах, бодисын солилцоог дэмжих үйлдэл үзүүлнэ.",
            imageSrc: "/images/mud-therapy.png",
            imageAlt: "Шавар эмчилгээ - Уламжлалт шавар эмчилгээ",
            reverse: true,
        },
        {
            title: "Физик эмчилгээ",
            description:
                "Биеийн био хэмнэлийн дагуу хийгдэх цахилгаан соронзон нь биеийн цусны эргэлтийг нэмэгдүүлж биед агуулагдаж буй шар усыг хөдөлгөөнд оруулж, хорт бодисыг гадагшлуулах үйлчилгээ үзүүлдэг.",
            imageSrc: "/images/physical-therapy.png",
            imageAlt: "Физик эмчилгээ - Бариа засал, массаж",
            reverse: false,
        },
    ];

    return (
        <section id="treatments" className="py-16 sm:py-24 bg-cream-dark">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="text-center mb-12 sm:mb-16">
                    <span className="text-emerald text-sm font-semibold tracking-[0.2em] uppercase">
                        Эрүүлээр урт наслая
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal mt-3 font-bold">
                        Манай эмчилгээнүүд
                    </h2>
                    <div className="flex justify-center items-center gap-3 mt-6">
                        <div className="w-16 h-[1px] bg-gold" />
                        <div className="w-2 h-2 rounded-full bg-gold" />
                        <div className="w-16 h-[1px] bg-gold" />
                    </div>
                </div>

                {/* Cards */}
                {treatments.map((treatment, index) => (
                    <TreatmentCard key={index} {...treatment} />
                ))}
            </div>
        </section>
    );
}
