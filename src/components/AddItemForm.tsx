import React, {ChangeEvent, KeyboardEvent, KeyboardEventHandler, useState} from 'react';
import {Button, IconButton, TextField} from '@mui/material';
import {ControlPoint} from '@mui/icons-material';

type AddItemFormProps = {
    addItem: (value: string) => void,
    disabled?: boolean
}

export const AddItemForm = React.memo(({addItem, disabled = false}: AddItemFormProps) => {

    console.log('Add Item Form')

    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setError('')
        setInputValue(e.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            addItem(inputValue)
            setInputValue('')
        }
    };

    const addTask = (inputValue: string) => {
        if (inputValue.trim() !== '') {
            addItem(inputValue.trim())
            setError('')
            setInputValue('')
        } else {
            setInputValue('')
            setError('Требуется название')
        }
    }

    return (
        <div>
            <TextField
                disabled={disabled}
                error={!!error}
                variant={'filled'}
                label={'Введите название'}
                value={inputValue}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                helperText={error}
            />
            <IconButton disabled={disabled} onClick={() => {
                addTask(inputValue)
            }}>
                <ControlPoint/>
            </IconButton>

        </div>
    )
})
