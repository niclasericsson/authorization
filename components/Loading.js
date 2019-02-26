import Header from './Header'
import Meta from '../components/meta'
import MainFont from '../components/MainFont'
import { Row } from 'simple-flexbox'

class Loading extends React.Component {

    constructor(props) {
        super(props);
    };

    componentDidMount(){
    	MainFont();
    }
  
    render() {

        return(
            <div>
            	<Meta />
				<Header disabled={true} />
				<Row vertical='center' justifyContent='center'>
					<h1 style={{marginTop: 200}}>Loading...</h1>
				</Row>
				<style jsx global>{`
	                body { 
	                    margin: 0;
	                    font-family: 'Quicksand', sans-serif !important;
	                }
	            `}</style>
			</div>
        );

    }
}

export default Loading