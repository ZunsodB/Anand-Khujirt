# 🚀 Анхны Тохиргоо — Quick Start Guide

## 1. Next.js Төсөл Үүсгэх

```bash
npx create-next-app@latest anand-khujirt \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd anand-khujirt
```

## 2. Шаардлагатай Package-уудыг Суулгах

```bash
# shadcn/ui суулгах
npx shadcn@latest init

# shadcn/ui component-уудыг суулгах
npx shadcn@latest add button card input label
npx shadcn@latest add calendar date-picker
npx shadcn@latest add dialog sheet badge
npx shadcn@latest add separator progress
npx shadcn@latest add toast sonner

# Prisma
npm install prisma @prisma/client
npx prisma init

# NextAuth
npm install next-auth

# Бусад
npm install date-fns
npm install zustand          # Booking wizard state management
npm install react-hook-form zod @hookform/resolvers
npm install lucide-react     # Icons (shadcn-тай ирнэ)
npm install axios
```

## 3. Файлуудыг Хуулах

```bash
# Энэ репо-н файлуудыг таны Next.js төсөлд хуулна:
cp CLAUDE.md /your-nextjs-project/
cp prisma/schema.prisma /your-nextjs-project/prisma/
cp .env.example /your-nextjs-project/
cp -r src/ /your-nextjs-project/
```

## 4. Environment Variables Тохируулах

```bash
cp .env.example .env.local
# .env.local файлыг нээж мэдээллүүдийг оруулна
```

## 5. Database Тохируулах

```bash
# Supabase дээр project үүсгэж DATABASE_URL авна
# Дараа нь:
npx prisma generate
npx prisma db push
```

## 6. Эхлүүлэх

```bash
npm run dev
# http://localhost:3000
```

---

## Stitch AI Design Reference

Stitch-ээс гаргасан design screenshot-уудыг хадгалах:

```bash
mkdir -p stitch-designs
# Файлуудыг нэрлэх:
# landing-page.png
# step1-transport.png
# step2-dates.png
# step3-guests.png
# step4-rooms.png
# step5-guest-info.png
# step6-payment.png
# admin-dashboard.png
```

Claude Code дээр ажиллахдаа screenshot-уудыг reference болгон оруулна.

---

## Хөгжүүлэлтийн Дараалал

```
1. ✅ Layout + Navbar + Footer
2. ✅ Landing page (нүүр хуудас)
3. ✅ Booking wizard - Step 1 (тээвэр)
4. ✅ Booking wizard - Step 2 (огноо)
5. ✅ Booking wizard - Step 3 (зочид)
6. ✅ Room selection cards
7. ✅ Guest info form
8. ✅ QPay integration
9. ✅ SMS confirmation
10. ✅ Admin panel
11. ✅ AI Chatbot (хамгийн сүүлд)
```
