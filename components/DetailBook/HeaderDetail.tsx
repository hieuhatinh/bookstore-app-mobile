import { useState } from 'react'
import { View, Text } from 'react-native'
import { Badge, IconButton, Menu } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const HeaderDetail = () => {
    const navigation: any = useNavigation()
    const title = useSelector((state: any) => state.products.titleProduct)
    const numberProducts = useSelector((state: any) => state.cart.numberProduct)

    const [visible, setVisible] = useState(false)

    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)

    return (
        <View className='flex flex-row items-center justify-between'>
            <IconButton
                icon='chevron-left'
                onPress={() => navigation.goBack()}
            />
            <Text
                className='flex-1 mx-1 text-slate-800 text-base'
                numberOfLines={1}
            >
                {title}
            </Text>
            <View className='pl-5 flex flex-row items-center justify-center'>
                <View className='relative'>
                    <IconButton
                        icon='cart-minus'
                        onPress={() => navigation.navigate('Cart')}
                    />
                    <Badge className='absolute top-0 right-0'>
                        {numberProducts}
                    </Badge>
                </View>

                <View>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <IconButton
                                icon='dots-horizontal'
                                onPress={openMenu}
                            />
                        }
                        anchorPosition='bottom'
                        style={{
                            marginRight: 2,
                        }}
                    >
                        <Menu.Item
                            leadingIcon='share'
                            onPress={() => {}}
                            title='Chia sẻ'
                        />
                        <Menu.Item
                            leadingIcon='heart-outline'
                            onPress={() => {}}
                            title='Yêu thích'
                        />
                    </Menu>
                </View>
            </View>
        </View>
    )
}

export default HeaderDetail
