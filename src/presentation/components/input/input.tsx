import React, { useContext, useRef } from 'react';
import Context from '@/presentation/contexts/form/form-context';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(Context);
  const inputRef = useRef<HTMLInputElement>();

  const error = state[`${props.name}Error`];

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
      data-testid={`${props.name}-wrap`}
    >
      <input
        {...props}
        ref={inputRef}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={e => {
          e.target.readOnly = false;
        }}
        onChange={handleChange}
        title={error}
      />
      <label
        data-testid={`${props.name}-label`}
        onClick={() => {
          inputRef.current.focus();
        }}
        title={error}
      >
        {props.placeholder}
      </label>
    </div>
  );
};

export default Input;
