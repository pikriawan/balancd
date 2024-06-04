import { withCors } from './lib/cors'
import { sql } from './lib/sql'

export default async (request, context) => {
  if (request.method === 'GET') {
    try {
      const views = await sql`SELECT * FROM view`[0].views

      await sql`
        UPDATE view
        SET views = ${views + 1}
        WHERE id = 1
      `

      return new Response(null, withCors({
        status: 200,
      }))
    } catch (error) {
      console.error(error)

      return new Response(null, withCors({
        status: 500
      }))
    }
  }
}