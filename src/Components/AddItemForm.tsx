import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormProps = {
    addItem: (value: string) => void,
}

function AddItemForm(props: AddItemFormProps) {

    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setInputValue(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addItem(inputValue)
            setInputValue('')

        }
    };

    const addTask = (inputValue: string) => {
        if (inputValue.trim() !== '') {
            props.addItem(inputValue.trim())
            setError(false)
            setInputValue('')
        } else {
            setInputValue('')
            setError(true)
        }
    }

    return (
        <div>
            <input
                value={inputValue}
                onChange={(e) => onChangeHandler(e)}
                onKeyPress={(e) => onKeyPressHandler(e)}
                className={error ? 'error' : ''}
            />
            <button onClick={() => {
                addTask(inputValue)
            }}>+
            </button>

            <div className={error ? 'error-message' : 'none-error'}>
                Field Is Required
            </div>
        </div>
    )
}


export default AddItemForm