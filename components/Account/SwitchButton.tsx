import { Text, TouchableOpacity, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface IPropItem {
    title: string
    iconName: string
    screenName: string
}

interface IPropSwitchButton {
    item: IPropItem
    navigation: any
}

const SwitchButton = (props: IPropSwitchButton) => {
    const { item, navigation } = props

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            className='mx-2 my-1 px-2 rounded-xl h-[45px] flex flex-row justify-between items-center bg-fourth-color'
            onPress={() => {
                navigation.navigate(item.screenName)
            }}
        >
            <View className='h-full flex flex-row justify-center items-center'>
                <Icon
                    name={item.iconName}
                    size={24}
                    color='black'
                    className='mr-p'
                />
                <Text className='ml-2'>{item.title}</Text>
            </View>
            <IconButton icon='chevron-right' />
        </TouchableOpacity>
    )
}

export default SwitchButton
