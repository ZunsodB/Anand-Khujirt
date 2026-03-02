# CLAUDE.md — Ананд Хужирт Сувиллалын Захиалгын Систем

## Төслийн Танилцуулга

**Нэр:** Ананд Хужирт Сувиллалын Захиалга Удирдлагын Систем  
**Зориулалт:** Өвөрхангай аймгийн Хужирт сумын "Ананд Хужирт" сувиллалын вэб захиалгын систем  
**Хэрэглэгч:** Голлон 40+ насны монгол хэрэглэгчид (ахмад хэрэглэгч төвлөрсөн UX)  
**Хэл:** Монгол хэл (UI текст бүгд монголоор)  
**Онцлог:** Mobile-first, Tap-only зарчим, хамгийн энгийн UX

---

## Tech Stack

```
Frontend:   Next.js 14 (App Router) + TypeScript
UI:         shadcn/ui + Tailwind CSS
Database:   PostgreSQL (Supabase)
ORM:        Prisma
Auth:       NextAuth.js (optional login)
Payment:    QPay (Монголын төлбөрийн систем)
SMS:        (Монголын SMS provider - TBD)
Deploy:     AWS
```

---

## Folder Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page (нүүр хуудас)
│   ├── layout.tsx                  # Root layout
│   ├── booking/
│   │   └── page.tsx               # Booking wizard (6 алхам)
│   ├── rooms/
│   │   └── page.tsx               # Room selection cards
│   ├── confirmation/
│   │   └── page.tsx               # Захиалга баталгаажуулах
│   └── admin/
│       ├── layout.tsx             # Admin layout (protected)
│       ├── bookings/
│       │   └── page.tsx           # Бүх захиалгуудын жагсаалт
│       ├── calendar/
│       │   └── page.tsx           # Захиалгын календарь
│       ├── map/
│       │   └── page.tsx           # Visual floor plan map
│       └── settings/
│           └── page.tsx           # Bus schedule + system settings
├── components/
│   ├── ui/                        # shadcn/ui components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── booking/
│   │   ├── TransportStep.tsx      # Step 1: Тээвэр сонгох
│   │   ├── DateStep.tsx           # Step 2: Огноо сонгох
│   │   ├── GuestStep.tsx          # Step 3: Зочдын тоо + өрөө
│   │   ├── RoomStep.tsx           # Step 4: Өрөө сонгох (cards)
│   │   ├── GuestInfoStep.tsx      # Step 5: Холбоо барих мэдээлэл
│   │   ├── PaymentStep.tsx        # Step 6: QPay төлбөр
│   │   ├── BookingProgress.tsx    # Progress indicator
│   │   └── ChildrenConfig.tsx     # Хүүхдийн нас/орны тохиргоо
│   └── admin/
│       ├── FloorPlanMap.tsx       # SVG floor plan (admin only)
│       ├── BookingCalendar.tsx
│       └── CancellationReview.tsx
├── lib/
│   ├── prisma.ts                  # Prisma client
│   ├── auth.ts                    # NextAuth config
│   ├── qpay.ts                    # QPay integration
│   ├── sms.ts                     # SMS sender
│   ├── pricing.ts                 # Үнэ тооцоолох logic
│   └── availability.ts            # Room availability + lock logic
├── hooks/
│   ├── useBooking.ts              # Booking wizard state
│   └── useRoomAvailability.ts
└── types/
    └── index.ts                   # TypeScript types
```

---

## Database Schema (Prisma)

```prisma
// prisma/schema.prisma

model User {
  id        String   @id @default(cuid())
  phone     String   @unique
  lastName  String
  firstName String
  email     String?
  role      Role     @default(USER)
  bookings  Booking[]
  createdAt DateTime @default(now())
}

enum Role {
  USER
  ADMIN
}

model Room {
  id          String   @id @default(cuid())
  name        String   // "Энгийн өрөө", "Хагас люкс", "Бүтэн люкс"
  type        RoomType
  bedCount    Int      // 2, 3, 5, 6, 7
  pricePerNight Int    // төгрөгөөр (110000, 120000, 140000, 150000)
  floor       Int
  building    String   // "main", "extension"
  roomNumber  String   // "101", "205" гэх мэт
  description String?
  images      String[] // URL array
  isActive    Boolean  @default(true)
  bookings    BookingRoom[]
  locks       RoomLock[]
}

enum RoomType {
  STANDARD    // Энгийн өрөө
  SEMI_LUX    // Хагас люкс
  LUX         // Бүтэн люкс
}

model Booking {
  id                String        @id @default(cuid())
  userId            String?       // optional (guest checkout боломжтой)
  user              User?         @relation(fields: [userId], references: [id])
  
  // Guest info (бүртгэлгүй захиалгад)
  guestLastName     String
  guestFirstName    String
  guestPhone        String
  guestEmail        String?
  
  // Захиалгын мэдээлэл
  checkIn           DateTime
  checkOut          DateTime
  nights            Int
  transport         TransportType
  
  // Зочдын тоо
  adultCount        Int
  
  // Төлбөр
  totalPrice        Int           // төгрөгөөр
  status            BookingStatus @default(PENDING)
  
  // QPay
  qpayInvoiceId     String?
  qpayPaymentId     String?
  paidAt            DateTime?
  
  rooms             BookingRoom[]
  children          BookingChild[]
  cancellation      CancellationRequest?
  
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt
}

enum TransportType {
  PRIVATE   // Өөрийн тээвэр
  BUS       // Сувиллалын автобус
}

enum BookingStatus {
  PENDING       // Төлбөр хийгдээгүй
  CONFIRMED     // QPay баталгаажсан
  CANCELLED     // Цуцлагдсан
  COMPLETED     // Дууссан
}

model BookingRoom {
  id        String  @id @default(cuid())
  bookingId String
  booking   Booking @relation(fields: [bookingId], references: [id])
  roomId    String
  room      Room    @relation(fields: [roomId], references: [id])
}

model BookingChild {
  id          String    @id @default(cuid())
  bookingId   String
  booking     Booking   @relation(fields: [bookingId], references: [id])
  ageMin      Int       // нас
  ageMax      Int
  hasBed      Boolean
  withTreatment Boolean @default(false)
  pricePerNight Int
}

model RoomLock {
  id        String   @id @default(cuid())
  roomId    String
  room      Room     @relation(fields: [roomId], references: [id])
  startDate DateTime
  endDate   DateTime
  reason    String?  // admin тэмдэглэл
  createdBy String   // admin userId
  createdAt DateTime @default(now())
}

// Real-time availability lock (10 минут)
model BookingSession {
  id        String   @id @default(cuid())
  roomIds   String[] // locked room IDs
  checkIn   DateTime
  checkOut  DateTime
  expiresAt DateTime // now + 10 min
  createdAt DateTime @default(now())
}

model CancellationRequest {
  id          String             @id @default(cuid())
  bookingId   String             @unique
  booking     Booking            @relation(fields: [bookingId], references: [id])
  reason      String?
  status      CancellationStatus @default(PENDING)
  reviewedBy  String?
  reviewedAt  DateTime?
  createdAt   DateTime           @default(now())
}

enum CancellationStatus {
  PENDING
  APPROVED
  REJECTED
}

model BusSchedule {
  id        String   @id @default(cuid())
  dayOfWeek Int[]    // [1, 3, 6] = Mon, Wed, Sat
  isActive  Boolean  @default(true)
  updatedAt DateTime @updatedAt
}
```

---

## Үнэ Тооцоолох Logic

```typescript
// src/lib/pricing.ts

// Өрөөний үнэ: 1 хүний 1 хоног
ROOM_PRICES = {
  STANDARD: 110000,   // Энгийн өрөө (2 ортой)
  SEMI_LUX: 120000,   // Хагас люкс (5,6,7 ортой)
  LUX_SMALL: 140000,  // Бүтэн люкс (3 ортой)  
  LUX_LARGE: 150000,  // Бүтэн люкс (2 ортой)
}

// Хүүхдийн үнэ: 1 хоног
CHILD_PRICES = {
  NO_BED: {
    age_0_2:  0,      // Үнэгүй
    age_3_5:  35000,
    age_6_8:  45000,
    age_9_11: 55000,
  },
  WITH_BED_NO_TREATMENT: {
    age_8_11: 80000,
  },
  WITH_BED_WITH_TREATMENT: {
    age_8_11:  100000,
    age_12_up: "ROOM_PRICE", // Өрөөний үнээр
  }
}
```

---

## Booking Wizard — State Management

```typescript
// src/types/index.ts

interface BookingState {
  // Step 1
  transport: 'PRIVATE' | 'BUS' | null

  // Step 2
  checkIn: Date | null
  checkOut: Date | null
  nights: number

  // Step 3
  adultCount: number
  children: ChildConfig[]
  roomCount: number

  // Step 4
  selectedRooms: Room[]

  // Step 5
  guestLastName: string
  guestFirstName: string
  guestPhone: string
  guestEmail: string

  // Calculated
  totalPrice: number
  sessionId: string | null  // availability lock
}

interface ChildConfig {
  id: string
  ageRange: '0-2' | '3-5' | '6-8' | '8-11' | '12+'
  hasBed: boolean
  withTreatment: boolean
}
```

---

## Booking Wizard — 6 Алхам

```
Step 1: Тээвэр сонгох
  → PRIVATE эсвэл BUS
  → BUS бол хуваарь харуулна (Да, Лх, Бя)

Step 2: Огноо сонгох  
  → Date range picker
  → BUS сонгосон бол зөвхөн Да/Лх/Бя идэвхтэй

Step 3: Зочид & Өрөө
  → Насанд хүрэгчдийн тоо [+/-]
  → Хүүхдийн тоо [+/-] → нас, ор сонгох
  → Өрөөний тоо [+/-]

Step 4: Өрөө сонгох (Cards)
  → Алгоритм: нийт хүн ÷ өрөөний тоо = дундаж
  → Орны тоо дундажтай хамгийн ойр өрөөг эхэнд
  → Үнэ: хямдаас үнэтэй эрэмблэсэн
  → Availability lock эхэлнэ (10 мин)

Step 5: Зочны мэдээлэл
  → Овог*, Нэр*, Утас* (+976), И-мэйл (optional)

Step 6: Хураангуй + QPay
  → Бүх мэдээлэл харуулна
  → QPay товч дарахад invoice үүснэ
  → Амжилттай → SMS илгээнэ → Confirmation хуудас
```

---

## Admin Panel

```
/admin/bookings    → Бүх захиалгуудын хүснэгт
/admin/calendar    → Сарын календарь (өрөө бүрийн хуваарь)
/admin/map         → Visual SVG floor plan (өрөөний төлөв)
/admin/settings    → Автобусны хуваарь тохиргоо
```

### Admin Floor Plan (SVG)
- Өрөө бүр rectangle SVG элемент
- Өнгө: 🟢 Сул / 🔴 Дүүрэн / 🟡 Захиалгатай / ⚫ Лок
- Click → өрөөний дэлгэрэнгүй + захиалгын мэдээлэл
- Admin өрөө лок хийх (огноо сонгоод block)

---

## Cancellation Flow

```
User → "Цуцлах хүсэлт" товч дарна
  ↓
Arrival-д хэр ойр байна?
  ├── 7+ хоног → Анхааруулга харуулна (суутгал байж болно)
  └── <7 хоног → "Тодорхой хэмжээний суутгал тооцогдоно" alert
  ↓
Admin notification
  ↓
Admin: Зөвшөөрөх / Татгалзах
  ↓
SMS → Хэрэглэгчид мэдэгдэл
```

---

## Real-time Availability Lock

```
Хэрэглэгч Step 4 (өрөө сонгох) дээр орохоор:
  → BookingSession үүснэ (10 минутын хугацаатай)
  → Сонгосон өрөөнүүд бусад хэрэглэгчид харагдахгүй
  → QPay амжилттай → Booking CONFIRMED → Session устана
  → 10 мин дуусаад төлөөгүй → Session устана → Өрөө чөлөөлөгдөнө
```

---

## QPay Integration

```typescript
// src/lib/qpay.ts
// QPay sandbox: https://merchant.qpay.mn/v2/
// QPay production: https://api.qpay.mn/v2/

// Flow:
// 1. POST /invoice → invoice_id авна
// 2. Хэрэглэгчид QR эсвэл deep link харуулна
// 3. Webhook/polling → payment баталгаажсан эсэх
// 4. Confirmed → BookingStatus = CONFIRMED → SMS
```

---

## Environment Variables (.env)

```bash
# Database
DATABASE_URL="postgresql://..."

# Supabase
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""

# NextAuth
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

# QPay
QPAY_USERNAME=""
QPAY_PASSWORD=""
QPAY_INVOICE_CODE=""
QPAY_BASE_URL="https://merchant.qpay.mn/v2"

# SMS Provider
SMS_API_KEY=""
SMS_SENDER_ID=""

# Admin
ADMIN_SECRET=""
```

---

## UX Зарчмууд (Кодлохдоо дагах)

```
✅ Minimum font size: 18px (body), 22px+ (heading)
✅ Товчны minimum height: 52px (хуруугаар дарахад хялбар)
✅ Алхам бүрт "← Буцах" товч тодорхой харагдах
✅ Progress bar: ● ● ○ ○ ○ ○ (одоо хэдэн алхам дээр байгаа)
✅ Утасны дугаар +976 урьдчилан бөглөгдсөн байх
✅ Navbar-д "☎ Захиалах" товч үргэлж харагдах
✅ Алдааны мэдэгдэл тодорхой, монгол хэлээр
✅ Loading state бүх товчинд байх
✅ Mobile-first (375px-с эхэлж дизайнла)
```

---

## Стitch AI Design Reference

Stitch-ээс гаргасан screenshot-уудыг `/stitch-designs/` хавтсанд хадгалж,
component бүрийг хэрэгжүүлэхдээ reference болгон ашиглана.

```
/stitch-designs/
├── landing-page.png
├── step1-transport.png
├── step2-dates.png
├── step3-guests.png
├── step4-rooms.png
├── step5-guest-info.png
├── step6-payment.png
└── admin-dashboard.png
```

---

## Хөгжүүлэлтийн Дараалал

```
Phase 1: Foundation
  ✅ Next.js + shadcn/ui суулгах
  ✅ Prisma schema + Supabase холбох
  ✅ Үндсэн layout + Navbar

Phase 2: User Booking Flow
  → Landing page
  → Booking wizard (Step 1-6)
  → Room selection cards
  → QPay integration
  → SMS confirmation

Phase 3: Admin Panel
  → Bookings list + calendar
  → SVG floor plan map
  → Cancellation review
  → Bus schedule settings

Phase 4: AI Chatbot
  → Claude API integration
  → Сувиллалын мэдээллийн chatbot
```
