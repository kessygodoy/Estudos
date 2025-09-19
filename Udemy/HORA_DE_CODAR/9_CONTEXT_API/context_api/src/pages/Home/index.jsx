// import {useContext} from 'react'
// import {CounterContext} from '../../context/CounterContext'

// 4 - refatorando com hook
import { useCounterContext } from '../../hooks/useCounterContext'

import styles from './styles.module.css'
import ChangeCounter from '../../components/ChangeCounter'

const Home = () => {
    // const {counter} = useContext(CounterContext)
    const {counter, setCounter} = useCounterContext()

  return (
    <div className={styles.container}>
      HOME
      <p>Valor do contador: {counter}</p>
      <ChangeCounter />
    </div>
  )
}

export default Home
