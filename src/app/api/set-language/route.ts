import { NextRequest, NextResponse } from 'next/server'
import { COOKIE_NAME } from '@/shared/libs/i18n'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const language = body.language

  const response = NextResponse.json({ success: true })
  response.cookies.set(COOKIE_NAME, language)
  return response
}
