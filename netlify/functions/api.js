import { withCors } from './lib/cors'
import { sql } from './lib/sql'

export default async (request, context) => {
  switch (request.method) {
    case 'POST':
      const requestBody = await request.json()
      const email = requestBody?.email
      const name = requestBody?.name

      try {
        if (email && name) {
          await sql`
            INSERT INTO wishlist_email(email, name)
            VALUES(${email}, ${name})
          `

          return new Response(null, withCors({
            status: 200,
          }))
        } else {
          return new Response(null, withCors({
            status: 400,
          }))
        }
      } catch (error) {
        console.error(error)

        return new Response(null, withCors({
          status: 500,
        }))
      }
    default:
      return new Response(null, withCors({
        status: 200,
      }))
  }
}