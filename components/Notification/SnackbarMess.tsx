import { Snackbar } from 'react-native-paper'
import { Dispatch, SetStateAction } from 'react'

interface IPropSnackbar {
    message: string | undefined
    setMessage:
        | Dispatch<SetStateAction<string | undefined>>
        | Dispatch<SetStateAction<string>>
}

const SnackbarMess = ({ message, setMessage }: IPropSnackbar) => {
    const onDismissSnackBar = () => setMessage('')

    return (
        <Snackbar
            className='absolute bottom-2 mb-2'
            visible={!!message}
            onDismiss={onDismissSnackBar}
        >
            {message}
        </Snackbar>
    )
}

export default SnackbarMess
