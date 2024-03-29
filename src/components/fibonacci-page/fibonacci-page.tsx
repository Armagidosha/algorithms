import styles from './fibonacci-page.module.css'
import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useInput } from '../../utils/hooks';
import { Circle } from "../ui/circle/circle";
import { delay } from '../../utils/utils';
import { calcFibonacci } from './fibonacci';

export const FibonacciPage: React.FC = () => {
  const { inputs, setValues, handleChange } = useInput({
    value: ''
  })
  const [result, setResult] = useState<number[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const onSubmit = async (evt: FormEvent, num: number) => {
    evt.preventDefault()
    if (num < 0 || num > 19 || num === null) {
      return
    }
    setResult([])
    setIsDisabled(true)
    const fibonacciArray = calcFibonacci(Number(num))
    for (const el of fibonacciArray) {
      await delay()
      setResult(prev => [...prev, el])
    }
    setIsDisabled(false)
    setValues({value: ''})
  }


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className='input-container'>
        <Input
          onChange={handleChange}
          value={inputs.value}
          type="number"
          isLimitText={true}
          max={19}
          disabled={isDisabled}
          name="value" 
          data-cy='input' />
        <Button
          onClick={(evt) => onSubmit(evt, inputs.value)}
          type="submit"
          text="Рассчитать"
          disabled={!inputs.value.length || inputs.value > 19 || inputs.value < 0}
          isLoader={isDisabled} 
          data-cy='button' />
      </div>
      <ul className={styles.ul}> {
        result.map((element, index) =>
          <li key={index} className={styles.li}>
            <Circle
              letter={`${element}`}
              index={index} />
          </li>
        )
      }
      </ul>

    </SolutionLayout>
  );
};
