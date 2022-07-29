import React, {ChangeEvent, KeyboardEvent, KeyboardEventHandler, useState} from 'react';
import {Button, IconButton, TextField} from '@mui/material';
import {ControlPoint} from '@mui/icons-material';

type AddItemFormProps = {
    addItem: (value: string) => void,
}

export const AddItemForm = React.memo((props: AddItemFormProps) => {

    console.log('Add Item Form')

    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<string>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setError('')
        setInputValue(e.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            props.addItem(inputValue)
            setInputValue('')
        }
    };

    const addTask = (inputValue: string) => {
        if (inputValue.trim() !== '') {
            props.addItem(inputValue.trim())
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
                error={!!error}
                variant={'filled'}
                label={"Введите название"}
                value={inputValue}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                helperText={error}
            />
            <IconButton onClick={() => {
                addTask(inputValue)
            }}>
                <ControlPoint/>
            </IconButton>

        </div>
    )
})
