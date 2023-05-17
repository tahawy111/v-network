import { FC, useId, useState } from 'react';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    placeholder: string;
}

const Input: FC<InputProps> = ({ placeholder, ...props }) => {
    const inputId = useId();
    const [showPass, setShowPass] = useState<boolean>(false);
    
    return <div className=''>
        <label htmlFor={ inputId }>{ placeholder }</label>
        <input className={props.type === "password" ? "mb-0" : ""} id={ inputId } placeholder={ placeholder } { ...props }  type={ showPass && props.type === "password" ? "text" : props.type } />
        { props.type === "password" && (<div className='mb-2 select-none' onClick={ () => setShowPass((prev) => !prev) }>{ showPass ? "Hide" : "Show" }</div>) }
    </div>;
};

export default Input;