import { FlatList } from 'react-native'
import CardItem from '../Card/CardItem'

interface IDataItem {
    id: number
    name: string
    author: string
    image: string
}

interface IPropsProductList {
    data: IDataItem[] | undefined | null
    category: string | undefined | null
}

const ProductList = (props: IPropsProductList) => {
    const { data, category } = props

    return (
        <FlatList
            className='flex w-full pt-1'
            data={data}
            renderItem={({ item, index }) => <CardItem data={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            scrollEnabled={true}
        />
    )
}

export default ProductList
