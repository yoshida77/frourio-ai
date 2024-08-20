import { Auth } from "@auth/core"
import Google from "@auth/core/providers/google"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
	const authOptions = {
		providers: [
			Google({
				clientId: process.env.AUTH_GOOGLE_ID,
				clientSecret: process.env.AUTH_GOOGLE_SECRET,
			}),
		],
		secret: process.env.AUTH_SECRET,
		trustHost: true,
	}

	try {
		return await Auth(req, authOptions)
	} catch (error) {
		console.error('Auth error:', error)
		return new Response(JSON.stringify({ error: 'Authentication failed' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}
