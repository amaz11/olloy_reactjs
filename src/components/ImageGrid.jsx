import React from 'react'
import { CiImageOn } from 'react-icons/ci'

const ImageGrid = ({ targetId, data, gridRef, deleteImage }) => {
    return (
        <div className='imgGrid' ref={gridRef}>
            {
                data?.map(({ id, image }) => <div
                    className={`imgDiv ${targetId.includes(id) ? 'imgDivSelected' : 'imgDivNotSelected'} ${targetId.includes(id) && deleteImage ? 'deleted ' : ''} `}
                    key={id}
                    data-id={id}
                >
                    <input className='checkBox' type="checkbox" onClick={() => handleTargetId(id)} />
                    <img src={image} alt="img" />
                    <div className='overlay'></div>
                </div>
                )
            }
            <div className='addImageGrid'>
                <CiImageOn size={24} />
                <span>Add Image</span>
            </div>
        </div>
    )
}

export default ImageGrid