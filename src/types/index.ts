// src/types/index.ts

// ==================== ENUMS ====================

export type TransportType = 'PRIVATE' | 'BUS'
export type RoomType = 'STANDARD' | 'SEMI_LUX' | 'LUX'
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
export type CancellationStatus = 'PENDING' | 'APPROVED' | 'REJECTED'

// ==================== ROOM ====================

export interface Room {
  id: string
  name: string
  type: RoomType
  bedCount: number
  pricePerNight: number
  floor: number
  building: string
  roomNumber: string
  description?: string
  images: string[]
  isActive: boolean
}

// ==================== CHILD CONFIG ====================

export type ChildAgeRange = '0-2' | '3-5' | '6-8' | '8-11' | '12+'

export interface ChildConfig {
  id: string
  ageRange: ChildAgeRange
  hasBed: boolean
  withTreatment: boolean
  pricePerNight: number // тооцоологдсон үнэ
}

// ==================== BOOKING WIZARD STATE ====================

export interface BookingState {
  // Step 1: Тээвэр
  transport: TransportType | null

  // Step 2: Огноо
  checkIn: Date | null
  checkOut: Date | null
  nights: number

  // Step 3: Зочид & Өрөө
  adultCount: number
  children: ChildConfig[]
  roomCount: number

  // Step 4: Өрөө сонгох
  selectedRooms: Room[]
  sessionId: string | null // availability lock session

  // Step 5: Зочны мэдээлэл
  guestLastName: string
  guestFirstName: string
  guestPhone: string
  guestEmail: string

  // Тооцоолсон нийт үнэ
  totalPrice: number

  // Одоогийн алхам
  currentStep: number // 1-6
}

// ==================== PRICING ====================

export const ROOM_PRICES: Record<string, number> = {
  STANDARD: 110000,   // Энгийн өрөө (2 ортой)
  SEMI_LUX: 120000,   // Хагас люкс (5, 6, 7 ортой)
  LUX_2BED: 150000,   // Бүтэн люкс (2 ортой)
  LUX_3BED: 140000,   // Бүтэн люкс (3 ортой)
}

export const CHILD_PRICES = {
  NO_BED: {
    '0-2':  0,
    '3-5':  35000,
    '6-8':  45000,
    '9-11': 55000,
  },
  WITH_BED_NO_TREATMENT: {
    '8-11': 80000,
  },
  WITH_BED_WITH_TREATMENT: {
    '8-11':  100000,
    '12+':   null, // Өрөөний үнээр тооцно
  },
} as const

// ==================== BUS SCHEDULE ====================

// 0=Ням, 1=Даваа, 2=Мягмар, 3=Лхагва, 4=Пүрэв, 5=Баасан, 6=Бямба
export const DEFAULT_BUS_DAYS = [1, 3, 6] // Даваа, Лхагва, Бямба

export const DAY_NAMES: Record<number, string> = {
  0: 'Ням',
  1: 'Даваа',
  2: 'Мягмар',
  3: 'Лхагва',
  4: 'Пүрэв',
  5: 'Баасан',
  6: 'Бямба',
}

// ==================== API RESPONSES ====================

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface AvailableRoomsResponse {
  rooms: Room[]
  sessionId: string
  expiresAt: string
}

export interface QPaYInvoiceResponse {
  invoice_id: string
  qr_text: string
  qr_image: string
  urls: {
    name: string
    description: string
    logo: string
    link: string
  }[]
}
