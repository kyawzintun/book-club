import React, { Component } from 'react';
import { Form, Input, Icon } from 'semantic-ui-react'
import './search-book.css';

class SearchBook extends Component {
	render() {
		return (
			<div>
				<Form className="search-root">
					<Input onChange={this.props.handleChange} onKeyPress={this.props.searchBook} type="text" name="search-book" icon='search' size="large" iconPosition='left' placeholder={this.props.placeholder} autoComplete='off' />
					{this.props.loading &&
						<Icon className="search-loading" loading name='spinner' />
					}
			    </Form>
			</div>
		);
	}
}

export default SearchBook;
