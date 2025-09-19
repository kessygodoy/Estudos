// import {useContext} from 'react'
// import {CounterContext} from '../../context/CounterContext'

// 4 - refatorando com hook
import { useCounterContext } from '../../hooks/useCounterContext'

// 5 - contexts complexos
import {useTitleColorContext} from '../../hooks/useTitleColorContext'

import styles from './styles.module.css'
import ChangeCounter from '../../components/ChangeCounter'

const Home = () => {
    // const {counter} = useContext(CounterContext)
    const {counter, setCounter} = useCounterContext()

    // 5 - contexts complexos
    const {color, dispatch} = useTitleColorContext()

  return (
    <div style={{color:color}} className={styles.container }>
      HOME
      <p>Valor do contador: {counter}</p>
      <ChangeCounter />
      <p>Title Color: {color}</p>
    </div>
  )
}

export default Home
