import { FC, ReactNode, useId, useState } from 'react';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    placeholder: string;
    error?: string | null;
    footer?: string;
    children: ReactNode;
}

const Input: FC<InputProps> = ({ placeholder, error, footer, ...props }) => {
    return (<form>
        { children }
    </form>);
};

export default Input;