import { useEffect, useRef, useState } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { IValueImage } from '../../utilities/interface/product'

interface IPropsImage {
    images: IValueImage[]
}

const ImageBooks = (props: IPropsImage) => {
    const { images } = props

    const [indexImg, setIndexImg] = useState<number>(0)

    // khi click sẽ hiện ảnh tiếp theo hoặc ảnh trước
    const handlePressBefore = () => {
        let totalImage = images.length
        setIndexImg((prev) => (prev - 1) % totalImage)
    }

    const handlePressAfter = () => {
        let totalImage = images.length
        setIndexImg((prev) => (prev + 1) % totalImage)
    }

    // tự động đổi ảnh khác sau 5s
    const timeoutId = useRef<any>()

    useEffect(() => {
        let totalImage = images.length
        timeoutId.current = setTimeout(() => {
            setIndexImg((prev) => (prev + 1) % totalImage)
        }, 5000)

        return () => clearTimeout(timeoutId.current)
    })

    return (
        <View className='flex flex-1 w-full flex-row justify-between items-center'>
            {indexImg === -1 ? (
                <></>
            ) : (
                <TouchableOpacity
                    className='h-full flex justify-center items-center'
                    onPress={handlePressBefore}
                >
                    <Icon name='chevron-left' size={24} color='black' />
                </TouchableOpacity>
            )}
            <Image
                source={{
                    uri: images[indexImg].path,
                }}
                resizeMode='contain'
                height={255}
                className='flex flex-1'
            />
            {indexImg === images.length ? (
                <></>
            ) : (
                <TouchableOpacity
                    className='h-full flex justify-center items-center'
                    onPress={handlePressAfter}
                >
                    <Icon name='chevron-right' size={24} color='black' />
                </TouchableOpacity>
            )}
        </View>
    )
}

export default ImageBooks
