import React, {ChangeEvent, useState} from 'react';

type EditableSpanProps = {
    title: string;
    changeTitle: (title: string) => void
}

function EditableSpan(props: EditableSpanProps) {

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
            ? <input onChange={onChangeInputHandler} onBlur={activateViewMode} value={title} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    )
}

export default EditableSpan