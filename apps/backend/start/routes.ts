/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '#trpc/router'
import { createContext } from '#trpc/trpc'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    // -----------------------------------------------------------------------
    // User management routes (JSON body validated with VineJS)
    // -----------------------------------------------------------------------
    router
      .group(() => {
        router.get('/', [controllers.Users, 'index'])
        router.post('/', [controllers.Users, 'store'])
        router.get('/:id', [controllers.Users, 'show'])
        router.patch('/:id/profile', [controllers.Users, 'updateProfile'])
        router.patch('/:id/password', [controllers.Users, 'changePassword'])
        router.patch('/:id/active', [controllers.Users, 'setActive'])
        router.delete('/:id', [controllers.Users, 'destroy'])
      })
      .prefix('users')
      .as('users')
      .use(middleware.auth())
  })
  .prefix('/api/v1')

router.any('/trpc/*', async (ctx) => {
  const { request, response } = ctx

  const url = `${request.protocol()}://${request.header('host')}${request.url(true)}`

  const headers = new Headers()
  for (const [key, value] of Object.entries(request.headers())) {
    if (value) {
      headers.set(key, Array.isArray(value) ? value.join(',') : String(value))
    }
  }

  const method = request.method()
  let body: string | undefined

  if (!['GET', 'HEAD'].includes(method)) {
    const rawBody = request.body()
    if (rawBody && Object.keys(rawBody).length > 0) {
      body = JSON.stringify(rawBody)
    }
  }

  const fetchRequest = new Request(url, {
    method,
    headers,
    body,
  })

  const fetchResponse = await fetchRequestHandler({
    endpoint: '/trpc',
    req: fetchRequest,
    router: appRouter,
    createContext: () => createContext({ ctx }),
  })

  response.status(fetchResponse.status)
  fetchResponse.headers.forEach((value, key) => {
    response.header(key, value)
  })

  const responseBody = await fetchResponse.text()
  return response.send(responseBody)
})
