import { withCors } from './lib/cors'
import { sql } from './lib/sql'

export default async (request, context) => {
  switch (request.method) {
    case 'GET':
      try {
        const v = (await sql`SELECT * FROM view`)[0].views
        const views = parseInt(v)

        return new Response(
          JSON.stringify(views),
          withCors({
            status: 200,
          })
        )
      } catch (error) {
        console.error(error)

        return new Response(null, withCors({
          status: 500
        }))
      }
    case 'POST':
      try {
        const v = (await sql`SELECT * FROM view`)[0].views
        const views = parseInt(v)

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