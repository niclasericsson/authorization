import Link from 'next/link'
import { FiUser, FiHome } from 'react-icons/fi'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signedIn: props.signedIn,
            disabled: props.disabled,
            user: '',
        }
    }

    componentDidMount() {
        if (this.props.signedIn) {
            fetch('/api/user')
                .then((res) => res.json())
                .then((resJson) => this.setState({ user: resJson.message }))
        }
    }

    render() {
        const { signedIn, user, disabled } = this.state

        if (signedIn) {
            return (
                <div style={styles.container}>
                    <Link href="/">
                        <a style={styles.linkStyle}>
                            <FiHome />
                        </a>
                    </Link>
                    <div style={styles.rightContainer}>
                        <FiUser />
                        <span style={styles.authInfo}>{user}</span>
                    </div>
                </div>
            )
        } else {
            if (disabled) {
                return (
                    <div style={styles.container}>
                        <span style={styles.linkStyle}>
                            <FiHome />
                        </span>
                    </div>
                )
            } else {
                return (
                    <div style={styles.container}>
                        <Link href="/">
                            <a style={styles.linkStyle}>
                                <FiHome />
                            </a>
                        </Link>
                        <div style={styles.rightContainer}>
                            <Link href="/">
                                <a style={styles.linkStyle}>Sign in</a>
                            </Link>
                            <span style={styles.divider}>|</span>
                            <Link href="/register">
                                <a style={styles.linkStyle}>Register</a>
                            </Link>
                        </div>
                    </div>
                )
            }
        }
    }
}

const styles = {
    container: {
        color: '#fff',
        fontSize: 20,
        padding: 20,
        backgroundColor: '#009999',
    },
    rightContainer: {
        float: 'right',
    },
    authInfo: {
        marginLeft: 10,
    },
    linkStyle: {
        color: '#fff',
    },
    divider: {
        marginRight: 10,
        marginLeft: 10,
    },
}

export default Header
