import { useState } from 'react'
import { View } from 'react-native'
import { Badge, IconButton, Menu } from 'react-native-paper'

const HeaderDetail = () => {
    const [visible, setVisible] = useState(false)

    const openMenu = () => setVisible(true)
    const closeMenu = () => setVisible(false)

    return (
        <View>
            <View className='pl-5 flex flex-row items-center justify-center'>
                <View className='relative'>
                    <IconButton icon='cart-minus' />
                    <Badge className='absolute top-0 right-0'>3</Badge>
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
