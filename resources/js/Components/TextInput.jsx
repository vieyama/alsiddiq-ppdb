import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <label className="relative flex items-center">
            {props.icon &&
                <div className="absolute w-4 h-4 left-4 opacity-70">
                    {props.icon}
                </div>
            }
            <input
                {...props}
                type={type}
                className={
                    `border-gray-300 focus:border-primary focus:ring-primary h-12 rounded-lg shadow-sm w-full ${props.icon ? 'pl-10' : ''}` +
                    className
                }
                ref={input}
            />
        </label>

    );
});
