const styles =
  'font-size: 16px; border-radius: 5px; padding: 5px 25px 5px 10px; line-height: 30px;'

self.addEventListener('install', event => {
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  if (self.clients && clients.claim) {
    clients.claim()
  }
})

self.addEventListener('sync', event => {
  let type = event.tag.split('-')[1];
  let time = event.tag.split('-')[2];
  console.log(
    `%c sync event fired: request ${type} at ${time}`,
    `${styles} background: #00449e; color: #cdecff;`
  )
  event.waitUntil(fetchResource(type, time))
})

fetchResource = (resource, time) => {
  console.log(
    `%c getting response info: ${resource}`,
    `${styles} background: #5e2ca5; color: #d3b9f3;`
  )
  fetch('//jsonplaceholder.typicode.com/users')
    .then(response => {
      return response
    })
    .then(text => {
      console.log(
        '%c Request successful:',
        `${styles} background: #137752; color: #9eebcf;`
      )
      console.log(text)

      const message = {
        response: text.status,
        resource: resource,
        time: time
      }

      self.clients
        .matchAll()
        .then(all => all.map(client => client.postMessage(message)))
    })
    .catch(error => {
      console.log('Request failed', error)
    })
}
