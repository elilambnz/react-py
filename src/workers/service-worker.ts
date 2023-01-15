// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

addEventListener('install', () => {
  self.skipWaiting()
})
addEventListener('activate', () => {
  self.clients.claim()
})

const resolvers = new Map<string, Promise>()

addEventListener('message', (event) => {
  console.log('sw message:', event.data)

  if (event.data.type === 'INPUT') {
    const resolver = resolvers.get(event.data.id)
    if (!resolver) {
      console.error('No resolver')
      return
    }

    resolver(new Response(event.data.value, { status: 200 }))
  }
})

addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)

  if (url.pathname === '/get_input/') {
    const id = url.searchParams.get('id')
    console.log('waiting for response...', id)

    event.waitUntil(
      (async () => {
        if (!event.clientId) return
        const client = await clients.get(event.clientId)
        if (!client) return
        client.postMessage({
          type: 'AWAITING_INPUT',
          id
        })
      })()
    )

    event.respondWith(new Promise((r) => resolvers.set(id, r)))
  }
})
