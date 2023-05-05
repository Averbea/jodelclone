import HeaderTemplate from './HeaderTemplate'
import BackButton from './BackButton'

export default function BackHeader() {

    return (
        <HeaderTemplate left={
            <BackButton />
        } />
    )
}
