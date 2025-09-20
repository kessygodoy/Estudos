// import {useContext} from 'react'
// import {CounterContext} from '../../context/CounterContext'

// 4 - refatorando com hook
import { useCounterContext } from '../../hooks/useCounterContext'

// 5 - contexts complexos
import { useTitleColorContext } from '../../hooks/useTitleColorContext'

import styles from './styles.module.css'
import ChangeCounter from '../../components/ChangeCounter'

const Home = () => {
  // const {counter} = useContext(CounterContext)
  const { counter, setCounter } = useCounterContext()

  // 5 - contexts complexos
  const { color, dispatch } = useTitleColorContext()

  // 6 - alterando state complexo
  const setTitleColor = (color) => {
    dispatch({ type: color })
  }

  return (
    <div style={{ color: color }} className={styles.container}>
      HOME
      <p>Valor do contador: {counter}</p>
      <ChangeCounter />
      {/* 6 - contexts complexos */}
      <div>
        <button onClick={() => setTitleColor("RED")}>Vermelho</button>
        <button onClick={() => setTitleColor("BLUE")}>Azul</button>

      </div>
    </div>
  )
}

export default Home
