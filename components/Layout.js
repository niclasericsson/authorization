import Header from './Header'
import Meta from '../components/meta'
import MainFont from '../components/MainFont'

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signedIn: props.signedIn,
        }
    }

    componentDidMount() {
        MainFont()
    }

    render() {
        const { signedIn } = this.state

        return (
            <div>
                <Meta />
                <Header signedIn={signedIn} disabled={false} />
                {this.props.children}
                <style jsx global>{`
                    body {
                        margin: 0;
                        font-family: 'Quicksand', sans-serif !important;
                    }
                `}</style>
            </div>
        )
    }
}

export default Layout
