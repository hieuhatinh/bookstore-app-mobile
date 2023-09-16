import { Button, Dialog, Portal, Text } from 'react-native-paper'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'

interface IPropsDialog {
    visible: boolean
    setVisible: Dispatch<SetStateAction<boolean>>
    content: {
        describe: string
        textButton: string
        href?: string
    }
}

const DialogMessage = (props: IPropsDialog) => {
    const { visible, setVisible, content } = props

    const navigation = useNavigation<any>()

    const handlePress = useCallback(() => {
        if (!!content.href) {
            navigation.navigate(content.href)
        }
        setVisible(false)
    }, [content])

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={handlePress}>
                <Dialog.Content>
                    <Text>{content.describe}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={handlePress}>{content.textButton}</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

export default DialogMessage
