import { View, Text } from 'react-native'
import { ScrollView } from 'react-native'
import { Chip } from 'react-native-paper'

interface IPropTabbarItem {
    id: number
    title: string
}

interface IProps {
    tabbarList: IPropTabbarItem[]
}

const Header = (props: IProps) => {
    const { tabbarList } = props
    return (
        <View className='pb-2'>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {tabbarList.map((item: IPropTabbarItem) => (
                    <Chip
                        key={item.id}
                        mode='outlined'
                        style={{ marginHorizontal: 4 }}
                    >
                        {item.title}
                    </Chip>
                ))}
            </ScrollView>
        </View>
    )
}

export default Header
