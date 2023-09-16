import { FlatList } from 'react-native'
import CardItem from '../Card/CardItem'
import { IProduct } from '../../utilities/interface/product'

interface IPropsProductList {
    products: IProduct[] | undefined | null
}

const ProductList = (props: IPropsProductList) => {
    const { products } = props

    return (
        <FlatList
            className='flex w-full pt-1'
            data={products}
            renderItem={({ item }) => <CardItem product={item} />}
            keyExtractor={(item) => item._id.toString()}
            numColumns={2}
            scrollEnabled={true}
        />
    )
}

export default ProductList
