import { Text } from 'react-native'

const ProductDescription = ({ route }: any) => {
    return (
        <Text className='text-secondary-font bg-white mt-1 px-3 text-justify'>
            {route.params.description}
        </Text>
    )
}

export default ProductDescription
