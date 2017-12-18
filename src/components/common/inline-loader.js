import React, { Component } from 'react';
import { Loader }from 'semantic-ui-react';
import '../../assets/style.css';

class InlineLoader extends Component {
	render() {
		return (
			<Loader className="inline-loader" active inline='centered' />
		);
	}
}

export default InlineLoader;