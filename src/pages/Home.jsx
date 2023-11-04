import React, { useEffect, useRef, useState } from 'react'
import './homeStyle.css'
import Sortable from 'sortablejs'
import Header from '../components/Header'
import ImageGrid from '../components/ImageGrid'


const Home = () => {
    const [data, setData] = useState([
        {
            id: 1,
            image: "https://raw.githubusercontent.com/amaz11/olloy_reactjs/main/src/assets/image-1.webp"
        },
        {
            id: 2,
            image: "https://raw.githubusercontent.com/amaz11/olloy_reactjs/main/src/assets/image-2.webp"
        },
        {
            id: 3,
            image: "https://raw.githubusercontent.com/amaz11/olloy_reactjs/main/src/assets/image-3.webp"
        },
        {
            id: 4,
            image: "https://raw.githubusercontent.com/amaz11/olloy_reactjs/main/src/assets/image-4.webp"
        },
        {
            id: 5,
            image: "https://raw.githubusercontent.com/amaz11/olloy_reactjs/main/src/assets/image-5.webp"
        }, {

            id: 6,
            image: "https://raw.githubusercontent.com/amaz11/olloy_reactjs/main/src/assets/image-6.webp"
        },
        {
            id: 7,
            image: "https://raw.githubusercontent.com/amaz11/olloy_reactjs/main/src/assets/image-7.webp"
        },
        {
            id: 8,
            image: "https://raw.githubusercontent.com/amaz11/olloy_reactjs/main/src/assets/image-8.webp"
        }, {
            id: 9,
            image: "https://raw.githubusercontent.com/amaz11/olloy_reactjs/main/src/assets/image-9.webp"
        },
        {
            id: 10,
            image: "https://raw.githubusercontent.com/amaz11/olloy_reactjs/main/src/assets/image-10.jpeg"
        },
        {
            id: 11,
            image: "https://raw.githubusercontent.com/amaz11/olloy_reactjs/main/src/assets/image-11.jpeg"
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
            <Header targetId={targetId} handleDelete={handleDelete} />
            <ImageGrid targetId={targetId} data={data} deleteImage={deleteImage} gridRef={gridRef} handleTargetId={handleTargetId} />
        </div >
    )
}

export default Home