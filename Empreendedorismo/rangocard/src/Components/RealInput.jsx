import { InputBase } from '@mui/material';
import React, { useEffect, useState } from 'react';

function RealInput({
    inputRef,
    onKeyDown,
    onValueChange,
    clearInput,
    onClear,
}) {
    const [value, setValue] = useState('');

    useEffect(() => {
        if (clearInput) {
            setValue('');
            onClear();
        }
    }, [clearInput, onClear]);

    const handleChange = (event) => {
        // let { val } = event.target;

        let val = event.target.value;
        val = val.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        val = val.replace(/(\d)(\d{2})$/, '$1,$2'); // Coloca a vírgula antes dos últimos 2 dígitos
        val = val.replace(/(?=(\d{3})+(\D))\B/g, '.'); // Coloca um ponto a cada 3 dígitos
        setValue(`R$${val}`);
        onValueChange(val);
    };

    return (
        <InputBase
            inputRef={inputRef}
            onKeyDown={onKeyDown}
            value={value}
            onChange={handleChange}
            sx={{
                width: '120px',
                pl: 2,
                ml: 1,
                borderRadius: 4,
                border: 1,
                borderColor: '#B0B0B0',
                backgroundColor: '#F4F4F4',
            }}
            placeholder="R$00,00"
        />
    );
}

export default RealInput;
