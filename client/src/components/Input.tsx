import clsx from 'clsx';
import { FC, useId, useState } from 'react';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    placeholder: string;
}

const Input: FC<InputProps> = ({ placeholder, ...props }) => {
    const inputId = useId();
    const [showPass, setShowPass] = useState<boolean>(false);

    return props.type === "radio" ?
        <div className={ `flex` }>
            <label htmlFor={ inputId }>{ placeholder }</label>
            <input id={ inputId } className={ clsx('w-fit mx-1', props.className) } {...props} />
        </div>
        : <div>
            <label htmlFor={ inputId }>{ placeholder }</label>
            <input className={ clsx(props.type === "password" ? "mb-0" : "", props.className) } id={ inputId } placeholder={ placeholder } { ...props } type={ showPass && props.type === "password" ? "text" : props.type } />
            { props.type === "password" && (<div className='mb-2 select-none' onClick={ () => setShowPass((prev) => !prev) }>{ showPass ? "Hide" : "Show" }</div>) }
        </div>;
};

export default Input;