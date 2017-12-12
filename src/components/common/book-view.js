import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

import coverImg from '../../assets/matthew.png';
import './book-view.css'

class BooksRoot extends Component {
	render() {
		return (
			<div className="books-root">
		      	{
		      		this.props.lists.map((list,i) =>{
		      			return (
							<Card className="book-card" key={i}>
								<div className="book-img-wrap">
							    	<Image src={coverImg} className="cover-img"/>
									<div className="book-img-shade">
										<button onClick={()=>this.props.handleOpen('details')} className="ui button book-img-button bf-theme-basic">View Details</button>
									</div>
							    </div>
							    <Card.Content className="card-content">
							      <Card.Header>Matthew </Card.Header>
							      <Card.Meta>
							        <span className='date'>Author : Kyaw Zin Tun </span>
							      </Card.Meta>
							      <Card.Meta>
							      	<span className='date'>Published on : 2011</span>
							      </Card.Meta>
							      <Card.Meta>
							        <span className='date'>Pages : 500</span>
							      </Card.Meta>
							    </Card.Content>
							    <Card.Content extra>
							      <a><Icon name='heart' />Add to wish list</a>
							    </Card.Content>
							</Card>
						);
		      		})
		      	}
		    </div>
		);
	}
}

export default BooksRoot;