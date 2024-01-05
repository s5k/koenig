import React from 'react';
import clsx from 'clsx';
import {Button} from './Button';

export function SubscribeForm({dataTestId, placeholder, value, buttonSize, buttonText, buttonStyle, onChange, onFocus, onBlur, disabled}) {
    const onChangeWrapper = (e) => {
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className={clsx(
            'relative flex rounded border border-grey-500/30 bg-white',
            buttonSize === 'large' ? 'p-[3px]' : 'p-[2px]',
        )}>
            <input
                className={clsx(
                    'relative w-full bg-white px-4 py-2 font-sans font-normal text-grey-900 focus-visible:outline-none',
                    buttonSize === 'small' && 'h-10 text-md leading-[40px]',
                    buttonSize === 'medium' && 'h-11 text-[16px] leading-[44px]',
                    buttonSize === 'large' && 'h-12 text-lg leading-[48px]',
                )}
                defaultValue={value}
                placeholder={placeholder}
                tabIndex={disabled ? '-1' : ''}
                readOnly
                onBlur={onBlur}
                onChange={onChangeWrapper}
                onFocus={onFocus}
            />
            <Button dataTestId={dataTestId} disabled={disabled} placeholder='' size={buttonSize} style={buttonStyle} value={buttonText}/>
        </div>
    );
}
