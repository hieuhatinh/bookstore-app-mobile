import { useEffect, useRef, useState } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { IValueImage } from '../../utilities/interface/product'

interface IPropsImage {
    images: IValueImage[]
}

const ImageBooks = (props: IPropsImage) => {
    const { images } = props

    let lengthImages = images?.length

    const [indexImg, setIndexImg] = useState<number>(1)

    // khi click sẽ hiện ảnh tiếp theo hoặc ảnh trước
    const handlePressBefore = () => {
        let totalImage = lengthImages
        setIndexImg((prev) => (prev - 1) % totalImage)
    }

    const handlePressAfter = () => {
        let totalImage = lengthImages
        setIndexImg((prev) => (prev + 1) % totalImage)
    }

    // tự động đổi ảnh khác sau 5s
    const timeoutId = useRef<any>()

    useEffect(() => {
        let totalImage = lengthImages
        timeoutId.current = setTimeout(() => {
            setIndexImg((prev) => (prev + 1) % totalImage)
        }, 5000)

        return () => clearTimeout(timeoutId.current)
    })

    return (
        <View className='flex flex-1 w-full flex-row justify-between items-center'>
            {indexImg <= 0 ? (
                <></>
            ) : (
                <TouchableOpacity
                    className='h-full flex justify-center items-center'
                    onPress={handlePressBefore}
                >
                    <Icon name='chevron-left' size={24} color='black' />
                </TouchableOpacity>
            )}
            {images?.[indexImg].path ? (
                <Image
                    source={{
                        uri: images?.[indexImg].path,
                    }}
                    resizeMode='contain'
                    height={255}
                    className='flex flex-1'
                />
            ) : (
                <Image
                    source={require('../../assets/images/load-img.png')}
                    resizeMode='contain'
                    height={255}
                    className='flex flex-1'
                />
            )}
            {indexImg >= lengthImages - 1 ? (
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
