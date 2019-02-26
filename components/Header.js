import Link from 'next/link'
import { FiUser, FiHome } from "react-icons/fi";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signedIn: props.signedIn
        }
    };

    componentDidMount(){
        //console.log(this.props.signedIn)
    }
  
    render() {

        const { signedIn } = this.state;

        if(signedIn){

            return(
                <div style={styles.container}>
                    <Link href="/">
                      <a style={styles.linkStyle}><FiHome /></a>
                    </Link>
                    <div style={styles.rightContainer}>
                        <FiUser />
                        <span style={styles.authInfo}>Signed in</span>
                    </div>
                </div>
            )

        } else {

            return(
                <div style={styles.container}>
                    <Link href="/">
                      <a style={styles.linkStyle}><FiHome /></a>
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

const styles = {
    container: {
        color: '#fff',
        fontSize: 20,
        padding: 20,
        backgroundColor: '#009999'
    },
    rightContainer: {
        float: 'right'
    },
    authInfo: {
        marginLeft: 10
    },
    linkStyle: {
        color: '#fff'
    },
    divider: {
        marginRight: 10,
        marginLeft: 10
    }
}

export default Header