// Demo build-safe stub for legacy NextAuth route.
// We don't use NextAuth in this demo; sign-in is cookie-based.

export async function GET() {
  return new Response("Auth disabled in demo.", { status: 404 });
}

export async function POST() {
  return new Response("Auth disabled in demo.", { status: 404 });
}
