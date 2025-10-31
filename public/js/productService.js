// ===== Fetching products =====

export async function getProducts(filters = {}) {
  const queryParams = new URLSearchParams(filters)
  const res = await fetch(`/api/products?${queryParams}`)
  return await res.json()
}

// ===== Populate the Movement dropdown =====
//console.log('populateGenreSelect() called')

export async function populateGenreSelect() {
  const res = await fetch('/api/products/movement')
  const movement = await res.json() // expects an array of genres as strings: ['rock', 'pop', ...]
  const select = document.getElementById('movement-select')

  movement.forEach(movement => {
    const option = document.createElement('option')
    option.value = movement
    option.textContent = movement
    select.appendChild(option)
  })
}