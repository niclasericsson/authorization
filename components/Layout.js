import Header from './Header'
import Meta from '../components/meta'

class Layout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signedIn: props.signedIn
        }
    };
  
    render() {

        const { signedIn } = this.state;

        return(
            <div>
            	<Meta />
				<Header signedIn={signedIn} />
				{this.props.children}
			</div>
        );

    }
}

export default Layout