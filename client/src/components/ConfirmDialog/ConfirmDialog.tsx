import React from 'react'
import './ConfirmDialog.css'

interface Props {
    onConfirm: Function,
    onCancel: Function,
    children?: React.ReactNode;
}

export default function ConfirmDialog({ onConfirm, onCancel, children }: Props) {


    return (
        <div className='confirm-dialog' onClick={(e) => { e.stopPropagation(); onCancel() }}>
            <div className='confirm-dialog-box' onClick={(e) => e.stopPropagation()}>
                <h1>Confirm</h1>
                <div className='confirm-dialog-content'>{children}</div>
                <footer>
                    <button onClick={() => onConfirm()}>Ok</button>
                    <button onClick={() => onCancel()}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}
