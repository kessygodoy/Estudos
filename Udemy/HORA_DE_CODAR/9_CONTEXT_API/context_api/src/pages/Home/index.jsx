import {useContext} from 'react'
import {CounterContext} from '../../context/CounterContext'

import styles from './styles.module.css'
import ChangeCounter from '../../components/ChangeCounter'

const Home = () => {
    const {counter} = useContext(CounterContext)
  return (
    <div className={styles.container}>
      HOME
      <p>Valor do contador: {counter}</p>
      <ChangeCounter />
    </div>
  )
}

export default Home
