// src/lib/pricing.ts
import { ChildConfig, Room } from '@/types'

/**
 * Хүүхдийн 1 хоногийн үнэ тооцоолно
 */
export function calculateChildPrice(child: Omit<ChildConfig, 'pricePerNight'>): number {
  if (!child.hasBed) {
    // Ор эзлэхгүй
    const noBedPrices: Record<string, number> = {
      '0-2': 0,
      '3-5': 35000,
      '6-8': 45000,
      '8-11': 55000,
    }
    return noBedPrices[child.ageRange] ?? 0
  }

  if (child.hasBed && !child.withTreatment) {
    // Ор эзлэнэ, эмчилгээгүй
    if (child.ageRange === '8-11') return 80000
    return 0
  }

  if (child.hasBed && child.withTreatment) {
    // Ор эзлэнэ, эмчилгээтэй
    if (child.ageRange === '8-11') return 100000
    if (child.ageRange === '12+') return -1 // Өрөөний үнээр (caller тооцно)
    return 0
  }

  return 0
}

/**
 * Нийт захиалгын үнэ тооцоолно
 */
export function calculateTotalPrice(
  rooms: Room[],
  adultCount: number,
  children: ChildConfig[],
  nights: number
): number {
  // Өрөөний үнэ: (өрөөний үнэ × хүний тоо × хоног)
  // Тайлбар: pricePerNight нь 1 хүний 1 хоногийн үнэ
  const roomTotal = rooms.reduce((sum, room) => {
    return sum + room.pricePerNight * room.bedCount * nights
  }, 0)

  // Хүүхдийн үнэ
  const childTotal = children.reduce((sum, child) => {
    const pricePerNight = child.pricePerNight === -1
      ? (rooms[0]?.pricePerNight ?? 0) // 12+ насны хүүхэд → өрөөний үнэ
      : child.pricePerNight
    return sum + pricePerNight * nights
  }, 0)

  return roomTotal + childTotal
}

/**
 * Өрөөний зөвлөмжийн алгоритм
 * Нийт хүн ÷ өрөөний тоо = дундаж → дундажтай хамгийн ойр орны тоотой өрөөг эхэнд гаргана
 */
export function sortRoomsByBestFit(rooms: Room[], totalPeople: number, roomCount: number): Room[] {
  const targetBeds = Math.ceil(totalPeople / roomCount)

  return [...rooms].sort((a, b) => {
    const diffA = Math.abs(a.bedCount - targetBeds)
    const diffB = Math.abs(b.bedCount - targetBeds)

    if (diffA !== diffB) return diffA - diffB // Орны тоогоор ойр нь эхэнд
    return a.pricePerNight - b.pricePerNight  // Үнэ хямдаас үнэтэй
  })
}

/**
 * Хэрэглэгчийн оролтоос нийт ор шаардлагатай тоо
 */
export function calculateTotalBedsNeeded(adultCount: number, children: ChildConfig[]): number {
  const childrenWithBed = children.filter(c => c.hasBed).length
  return adultCount + childrenWithBed
}
