import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react'
import './search-book.css';

class SearchBook extends Component {
	render() {
		return (
			<div>
				<Form className="search-root">
					<Input icon='search' size="large" iconPosition='left' placeholder={this.props.placeholder} />
			    </Form>
			</div>
		);
	}
}

export default SearchBook;
