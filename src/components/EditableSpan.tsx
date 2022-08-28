import React, {ChangeEvent, useState} from 'react';
import {Input} from '@mui/material';

type EditableSpanProps = {
    title: string;
    changeTitle: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanProps) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    return (
        editMode
            ? <Input onChange={onChangeInputHandler} onBlur={activateViewMode} value={title} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
})

