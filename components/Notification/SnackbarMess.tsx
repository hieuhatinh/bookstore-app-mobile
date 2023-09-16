import { Snackbar } from 'react-native-paper'
import { Dispatch, SetStateAction, useCallback } from 'react'

interface IPropSnackbar {
    message: string | undefined
    setMessage:
        | Dispatch<SetStateAction<string | undefined>>
        | Dispatch<SetStateAction<string>>
    action?: {
        label: string
        onPress: () => void
    }
}

const SnackbarMess = ({ message, setMessage, action }: IPropSnackbar) => {
    const onDismissSnackBar = useCallback(() => setMessage(''), [setMessage])

    return (
        <Snackbar
            className='absolute bottom-2 mb-2'
            visible={!!message}
            onDismiss={onDismissSnackBar}
            action={{
                label: action?.label || '',
                onPress: action?.onPress,
            }}
        >
            {message}
        </Snackbar>
    )
}

export default SnackbarMess
