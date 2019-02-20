import { Provider, connect } from 'react-redux';
import configureStore from '../store';
import Page2 from './page2';

const store = configureStore();

export default class App extends React.Component {

	constructor(props) {
        super(props);
        const storeState = store.getState();
        console.log(storeState)
        this.state = {
            user: storeState.user,
            isLoading: true,
            isCheckingUserLogin: true
        }
        const storeStateChange = this.storeStateChange.bind(this)
        store.subscribe(storeStateChange)
    };

    storeStateChange(){
        const storeState = store.getState();
        console.log(storeState)
        if((storeState.user != null && this.state.user == null) || (storeState.user && storeState.user.id && this.state.user.id && storeState.user.id != this.state.user.id)){
            this.setState({
                ...this.state,
                user: storeState.user
            })
            registerForPushNotificationsAsync(storeState.user.id);            
        }
    }

    render(){
    	return (
    		<Provider store={store}>
    			<div>
					<Page2 />
				</div>
			</Provider>
    	)
    }

}

/*const App = () => (
	<div>
		<Page2 />
	</div>
)

export default App;*/