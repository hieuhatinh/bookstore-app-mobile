import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { TouchableOpacity, Image, View, Text, Alert } from 'react-native'
import { Badge, Checkbox, IconButton } from 'react-native-paper'

interface IPropItem {
    id: number
    name: string
    author: string
    image: string
    price: number
}

interface ICheckBox {
    state: boolean
    price: number
}

interface IPropCartItem {
    checkboxes: ICheckBox[]
    handleCheckboxChange: (index: number, price: number) => void
    setCheckboxes: Dispatch<SetStateAction<ICheckBox[]>>
    index: number
    navigation: any
    item: IPropItem
}

const CartItemCart = (props: IPropCartItem) => {
    const {
        checkboxes,
        handleCheckboxChange,
        index,
        navigation,
        item,
        setCheckboxes,
    } = props
    const [quantityProduct, setQuantityProduct] = useState(1)

    const handlePressPlus = () => {
        setQuantityProduct((prev) => prev + 1)
    }

    const handlePressMinus = () => {
        if (quantityProduct > 1) {
            setQuantityProduct((prev) => prev - 1)
        } else {
            setQuantityProduct(1)
        }
    }

    useEffect(() => {
        const newCheckboxes = [...checkboxes]
        newCheckboxes[index].price = item.price * quantityProduct
        setCheckboxes(newCheckboxes)
    }, [quantityProduct])

    return (
        <View className='flex flex-row justify-between items-center bg-white mx-2 rounded-lg mt-2'>
            <View className='flex flex-row items-center'>
                <View className='ml-2'>
                    <Checkbox
                        color='#22d3ee'
                        status={
                            checkboxes[index].state ? 'checked' : 'unchecked'
                        }
                        onPress={() =>
                            handleCheckboxChange(
                                index,
                                item.price * quantityProduct,
                            )
                        }
                    />
                </View>
                <View className='flex flex-row items-center justify-start'>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => navigation.navigate('DetailBook')}
                    >
                        <Image
                            source={{
                                uri: 'data:image/jpeg;base64,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',
                            }}
                            alt='img'
                            width={120}
                            height={140}
                            className='my-2 ml-2 mr-3'
                        />
                    </TouchableOpacity>
                    <View className='flex justify-start items-start'>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => navigation.navigate('DetailBook')}
                        >
                            <Text className='text-primary-font font-bold'>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                        <Text className='text-red-500'>
                            {item.price}{' '}
                            <Badge
                                size={30}
                                className='rounded-full bg-transparent text-red-500'
                            >
                                đ
                            </Badge>
                        </Text>
                        <View className='flex flex-row justify-center items-center'>
                            <IconButton
                                icon='minus-box-outline'
                                onPress={handlePressMinus}
                            />
                            <Text>{quantityProduct}</Text>
                            <IconButton
                                icon='plus-box-outline'
                                onPress={handlePressPlus}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <IconButton
                icon='delete'
                size={25}
                onPress={() => console.log('Pressed')}
            />
        </View>
    )
}

export default CartItemCart
