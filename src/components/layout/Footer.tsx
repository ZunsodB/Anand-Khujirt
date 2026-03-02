import { Phone, MapPin, Mail, Clock } from "lucide-react";

export default function Footer() {
    return (
        <footer id="footer" className="bg-olive-dark text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {/* Column 1 — Navigation */}
                    <div>
                        <h3 className="font-serif text-lg font-bold mb-6 text-gold-light tracking-wide uppercase">
                            ЦЭС
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { label: "Шарлахуутын тухай", href: "#" },
                                { label: "Дархан ба цайлганд зо", href: "#" },
                                { label: "Өрөө", href: "/rooms" },
                                { label: "Эмчилгээ", href: "#treatments" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-white/70 hover:text-white transition-colors duration-300 text-base"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 2 — About */}
                    <div>
                        <h3 className="font-serif text-lg font-bold mb-6 text-gold-light tracking-wide uppercase">
                            БИДНИЙ ТУХАЙ
                        </h3>
                        <ul className="space-y-3">
                            {[
                                "Компаний тухай",
                                "Хамтын ажиллагаа",
                                "Тусгай нөхцөлүүд/захиалга",
                                "Тогтмогшин нэр олон",
                                "Хувийн бодлого",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-white/70 hover:text-white transition-colors duration-300 text-base"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 — Contact */}
                    <div>
                        <h3 className="font-serif text-lg font-bold mb-6 text-gold-light tracking-wide uppercase">
                            ХОЛБОО БАРИХ
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 mt-0.5 text-gold-light flex-shrink-0" />
                                <div>
                                    <a
                                        href="tel:+97699123456"
                                        className="text-white hover:text-gold-light transition-colors duration-300 text-base"
                                    >
                                        +976 9912-3456
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 mt-0.5 text-gold-light flex-shrink-0" />
                                <a
                                    href="mailto:info@anandkhujirt.mn"
                                    className="text-white/70 hover:text-white transition-colors duration-300 text-base"
                                >
                                    info@anandkhujirt.mn
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 mt-0.5 text-gold-light flex-shrink-0" />
                                <span className="text-white/70 text-base">
                                    Өвөрхангай аймаг, Хужирт сум, Тоонот гэр олон, 7-р хороо,
                                    дүүрэг, Дүлэн Гурван Хашаат, Тэрэж гол
                                </span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="w-5 h-5 mt-0.5 text-gold-light flex-shrink-0" />
                                <span className="text-white/70 text-base">
                                    Өдөр бүр 08:00 - 21:00
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col">
                        <span className="font-serif text-lg font-bold text-white tracking-wide">
                            АНАНД ХУЖИРТ
                        </span>
                        <span className="text-[9px] tracking-[0.3em] uppercase text-white/50">
                            С У В И Л А Л
                        </span>
                    </div>
                    <p className="text-white/40 text-sm">
                        © 2026 Ананд Хужирт Сувилал. Бүх эрх хуулиар хамгаалагдсан.
                    </p>
                </div>
            </div>
        </footer>
    );
}
