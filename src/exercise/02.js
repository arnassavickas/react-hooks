// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStorageState = (localStorageName, initialValue = '') => {
  const [state, setState] = React.useState(
    () =>
      JSON.parse(window.localStorage.getItem(localStorageName)) || initialValue,
  )

  const prevKey = React.useRef(localStorageName)

  React.useEffect(() => {
    if (prevKey.current !== localStorageName) {
      window.localStorage.removeItem(prevKey.current)
      prevKey.current = localStorageName
    }
    window.localStorage.setItem(localStorageName, JSON.stringify(state))
  }, [localStorageName, state])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [storageValue, setStorageValue] = React.useState('name')
  const [name, setName] = useLocalStorageState(storageValue, initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  function handleStorageValueChange(event) {
    setStorageValue(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
        <label htmlFor="localStorage">Local Storage: </label>
        <input
          value={storageValue}
          onChange={handleStorageValueChange}
          id="localStorage"
        />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
