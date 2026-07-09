import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const password = String(formData.get('password'))
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=${encodeURIComponent(error.message)}`,
      { status: 301 }
    )
  }

  // If email confirmation is required, you might want to redirect to a 'check your email' page.
  // Assuming it's turned off for local dev, we just go to dashboard.
  return NextResponse.redirect(`${requestUrl.origin}/dashboard`, {
    status: 301,
  })
}
