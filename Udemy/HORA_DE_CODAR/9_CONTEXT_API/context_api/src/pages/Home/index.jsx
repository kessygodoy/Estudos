import {useContext} from 'react'
import {CounterContext} from '../../context/CounterContext'

import styles from './styles.module.css'

const Home = () => {
    const {counter} = useContext(CounterContext)
  return (
    <div className={styles.container}>
      HOME
      <p>Valor do contador: {counter}</p>
    </div>
  )
}

export default Home
