import { FlatList } from 'react-native'
import CardItem from '../Card/CardItem'
import { IProduct } from '../../utilities/interface/product'

interface IPropsProductList {
    data: IProduct[] | undefined | null
    category: string | undefined | null
}

const ProductList = (props: IPropsProductList) => {
    const { data, category } = props

    return (
        <FlatList
            className='flex w-full pt-1'
            data={data}
            renderItem={({ item }) => <CardItem data={item} />}
            keyExtractor={(item) => item._id.toString()}
            numColumns={2}
            scrollEnabled={true}
        />
    )
}

export default ProductList
