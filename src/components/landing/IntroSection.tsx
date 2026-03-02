export default function IntroSection() {
    return (
        <section id="intro" className="py-20 sm:py-28 bg-cream">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Decorative element */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <svg
                            width="48"
                            height="48"
                            viewBox="0 0 48 48"
                            fill="none"
                            className="text-emerald"
                        >
                            <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1" />
                            <path
                                d="M24 8 C20 16, 16 20, 8 24 C16 28, 20 32, 24 40 C28 32, 32 28, 40 24 C32 20, 28 16, 24 8Z"
                                fill="currentColor"
                                opacity="0.15"
                            />
                            <path
                                d="M24 14 C22 18, 20 20, 14 24 C20 28, 22 30, 24 34 C26 30, 28 28, 34 24 C28 20, 26 18, 24 14Z"
                                fill="currentColor"
                                opacity="0.6"
                            />
                        </svg>
                    </div>
                </div>

                {/* Headline */}
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal leading-tight font-semibold">
                    Монголын уламжлалт эмчилгээний
                    <br />
                    <span className="text-emerald">нандин өв уламжлал.</span>
                </h2>

                {/* Divider */}
                <div className="flex justify-center items-center gap-3 my-8">
                    <div className="w-16 h-[1px] bg-gold" />
                    <div className="w-2 h-2 rounded-full bg-gold" />
                    <div className="w-16 h-[1px] bg-gold" />
                </div>

                {/* Description */}
                <p className="text-lg sm:text-xl text-muted leading-relaxed max-w-2xl mx-auto">
                    Байгалийн рашаан, эмчилгээний шаврын хүчийг ашиглан таны биеийн
                    эрүүл мэндийг сэргээж, оюун санааг тайвшруулна. Өвөрхангай аймгийн
                    Хужирт сумын үзэсгэлэнт байгалийн дунд орших манай сувиллал таныг
                    хүлээж байна.
                </p>
            </div>
        </section>
    );
}
