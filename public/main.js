// main.js
const update = document.querySelector('#update-button')

const deleteButton = document.querySelector('#delete-button')

const messageDiv = document.querySelector('#message')


update.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      author: document.getElementsByName('author')[0].value,
      quote: document.getElementsByName('quote')[0].value,
    })
  })
  .then(res=> {
    if (res.ok) return res.json()
  })
  .then(response => {
    window.location.reload(true)
  })
})


// deleteButton.addEventListener('click', _ => {
//   fetch('/quotes', {
//     method: 'delete',
//     headers: { 'Content-Type': 'application/json'},
//     body: JSON.stringify({
//       name: 'Darth Vader'
//     })
//   })
//   .then(res => {
//     if (res.ok) return res.json()
//   })
//   .then(response => {
//     if(response === 'No quote to delete'){
//       messageDiv.textContent = 'No Darth Vader quote to delete'
//     }else{
//       window.location.reload(true)
//     }
//   })
// })