import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export default function Cycles() {
    const {state} = useTaskContext();

    const cycleStep = Array.from({length: state.currentCycle});

    const cycleDescriptionMap = {
        workTime: 'foco',
        shortBreakTime: 'pausa curta',
        longBreakTime: 'pausa longa'
    }
    console.log(cycleStep)
    return(
        <div className={styles.cycles}>
            <span>Ciclos:</span>

            <div className={styles.cycleDots}>
                {cycleStep.map((_, index) => {
                    const nextCycle = getNextCycle(index);
                    const nextCycleType = getNextCycleType(nextCycle);
                    return <span className={`${styles.cycleDot} ${styles[nextCycleType]}`}
                    aria-label={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`} 
                    title={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`} 
                    key={nextCycle}
                    ></span>;
                })}
                {/* <span className={`${styles.cycleDot} ${styles.workTime}`}></span> */}
                {/* <span className={`${styles.cycleDot} ${styles.shortBreakTime}`}></span>
                <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
                <span className={`${styles.cycleDot} ${styles.shortBreakTime}`}></span>
                <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
                <span className={`${styles.cycleDot} ${styles.shortBreakTime}`}></span>
                <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
                <span className={`${styles.cycleDot} ${styles.longBrakTime}`}></span> */}
            </div>
        </div>
    )
}