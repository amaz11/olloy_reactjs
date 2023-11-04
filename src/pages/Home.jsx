import React, { useEffect, useRef, useState } from 'react'
import './homeStyle.css'
import { CiImageOn } from 'react-icons/ci'
import Sortable from 'sortablejs'



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

    const gridRef = useRef(null)
    const sortableJsRef = useRef(null)

    const onListChange = () => {
        const newData = [...gridRef.current.children]
            .map((i) => {
                const dataId = +i.getAttribute('data-id');
                return dataId;
            }
            )
            .filter((id) => id !== 0)
            .map((id) => {
                {
                    return data.find((item) => item.id === id);
                }
            });
        setData([...newData]);
    };

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

    useEffect(() => {
        sortableJsRef.current = new Sortable(gridRef.current, {
            animation: 150,
            onEnd: onListChange,
            onStart: (event) => {
                const id = event.item.getAttribute('data-id');
                dragImage.current = +id;
            },
            onSort: () => {
                onListChange();
            },
        });

    }, []);

    return (
        <div className='imgContainer'>
            <div className='header'>
                <h4>{targetId.length} Files Selected</h4>
                <span className={`deleteFileButton ${targetId.length > 0 ? 'deleteFileButtonShow' : 'deleteFileButtonHidden'}`} onClick={handleDelete}>Delete Files</span>
            </div>

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
        </div >
    )
}

export default Home