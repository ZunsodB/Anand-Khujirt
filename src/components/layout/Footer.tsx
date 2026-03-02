import { Phone, MapPin, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer id="footer" className="bg-emerald-dark text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
                    {/* Column 1 — Brand */}
                    <div>
                        <div className="flex flex-col mb-4">
                            <span className="font-serif text-xl font-bold text-white tracking-wide">
                                АНАНД ХУЖИРТ
                            </span>
                            <span className="text-[9px] tracking-[0.3em] uppercase text-white/50">
                                С У В И Л А Л
                            </span>
                        </div>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Байгалийн рашаан, шаврын хүчээр эрүүл мэндийг сэргээнэ.
                        </p>
                    </div>

                    {/* Column 2 — Үйлчилгээ */}
                    <div>
                        <h3 className="font-semibold text-sm mb-5 text-white uppercase tracking-wider">
                            Үйлчилгээ
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { label: "Рашаан эмчилгээ", href: "#treatments" },
                                { label: "Шавар эмчилгээ", href: "#treatments" },
                                { label: "Физик эмчилгээ", href: "#treatments" },
                                { label: "Захиалга өгөх", href: "/booking" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 — Бидний тухай */}
                    <div>
                        <h3 className="font-semibold text-sm mb-5 text-white uppercase tracking-wider">
                            Бидний тухай
                        </h3>
                        <ul className="space-y-3">
                            {[
                                "Сувилалын тухай",
                                "Түүх",
                                "Хамтын ажиллагаа",
                                "Хувийн бодлого",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4 — Холбоо барих */}
                    <div>
                        <h3 className="font-semibold text-sm mb-5 text-white uppercase tracking-wider">
                            Холбоо барих
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 mt-0.5 text-white/40 flex-shrink-0" />
                                <a
                                    href="tel:+97699123456"
                                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
                                >
                                    +976 9912-3456
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 mt-0.5 text-white/40 flex-shrink-0" />
                                <a
                                    href="mailto:info@anandkhujirt.mn"
                                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm"
                                >
                                    info@anandkhujirt.mn
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 mt-0.5 text-white/40 flex-shrink-0" />
                                <span className="text-white/60 text-sm">
                                    Өвөрхангай аймаг, Хужирт сум
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p className="text-white/30 text-xs">
                        © 2026 Ананд Хужирт Сувилал. Бүх эрх хуулиар хамгаалагдсан.
                    </p>
                    <p className="text-white/30 text-xs">
                        Powered by Анонс
                    </p>
                </div>
            </div>
        </footer>
    );
}
