import React from 'react'

const Header = ({ targetId, handleDelete }) => {
    return (
        <div className='header'>
            <h4>{targetId.length} Files Selected</h4>
            <span className={`deleteFileButton ${targetId.length > 0 ? 'deleteFileButtonShow' : 'deleteFileButtonHidden'}`} onClick={handleDelete}>Delete Files</span>
        </div>
    )
}

export default Header