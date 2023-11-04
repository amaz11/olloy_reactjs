import React, { useEffect, useRef, useState } from 'react'
import './homeStyle.css'
import { CiImageOn } from 'react-icons/ci'
// import { data } from '../data/data'

// ${index === dragImage.current ? 'dragging' : ''} 


const Home = () => {
    const [data, setData] = useState([
        {
            id: 1,
            image: "/src/assets/image-1.webp"
        },
        {
            id: 2,
            image: "/src/assets/image-2.webp"
        },
        {
            id: 3,
            image: "/src/assets/image-3.webp"
        },
        {
            id: 4,
            image: "/src/assets/image-4.webp"
        },
        {
            id: 5,
            image: "/src/assets/image-5.webp"
        }, {

            id: 6,
            image: "/src/assets/image-6.webp"
        },
        {
            id: 7,
            image: "/src/assets/image-7.webp"
        },
        {
            id: 8,
            image: "/src/assets/image-8.webp"
        }, {
            id: 9,
            image: "/src/assets/image-9.webp"
        },
        {
            id: 10,
            image: "/src/assets/image-10.jpeg"
        },
        {
            id: 11,
            image: "/src/assets/image-11.jpeg"
        }
    ])
    const [targetId, setTargetId] = useState([])
    const [deleteImage, setDeleteImage] = useState(false)

    const dragImage = useRef(0)
    const dragOverImage = useRef(0)

    const handleSwap = () => {
        console.log("dragImage: " + dragImage.current)
        console.log("dragOverImage: " + dragOverImage.current)
        const copyData = [...data]
        let temp = copyData[dragImage.current]
        copyData[dragImage.current] = copyData[dragOverImage.current]
        copyData[dragOverImage.current] = temp
        setData([...copyData])
    }

    const handleTargetId = (id) => {
        const existTargetId = targetId.includes(id)
        if (existTargetId) {
            const deleteTargetData = targetId.filter(filterId => filterId !== id)
            setTargetId([...deleteTargetData])
        } else {
            setTargetId(pre => [...pre, id])
        }
    }

    const handleDelete = () => {
        setDeleteImage(!deleteImage)
        const deleteTargetData = data.filter(dataId => !targetId.includes(dataId.id))
        setData([...deleteTargetData])
        setTargetId([])
        setDeleteImage(!deleteImage)
    }

    return (
        <div className='imgContainer'>
            <div className='header'>
                <h4>{targetId.length} Files Selected</h4>
                <span className={`deleteFileButton ${targetId.length > 0 ? 'deleteFileButtonShow' : 'deleteFileButtonHidden'}`} onClick={handleDelete}>Delete Files</span>
            </div>

            <div className='imgGrid'>
                {
                    data?.map((item, index) => <div className={`imgDiv ${index === dragImage.current ? 'testClass' : ''} ${targetId.includes(item.id) ? 'imgDivSelected' : 'imgDivNotSelected'} ${targetId.includes(item.id) && deleteImage ? '.deleted ' : ''} `}
                        key={item.id}
                        draggable
                        onDragStart={() => (dragImage.current = index)}
                        onDragEnter={() => (dragOverImage.current = index)}
                        onDragEnd={handleSwap}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <input className='checkBox' type="checkbox" onClick={() => handleTargetId(item.id)} />
                        <img src={item.image} alt="img" />
                        <div className='overlay'></div>
                    </div>

                    )
                }
                <div className='addImageGrid'>
                    <CiImageOn size={24} />
                    <span>Add Image</span>
                </div>
            </div>
        </div >
    )
}

export default Home