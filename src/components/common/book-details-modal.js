import React, { Component } from 'react';
import { Image, Modal, Button, Header } from 'semantic-ui-react';
import coverImg from '../../assets/img-not-found.jpg';

import './book-details-modal.css';

class BookDetailsModal extends Component {
	render() {
		const book = this.props.book;
		const type = this.props.type;
		return (
			<Modal className="book-details-modal" dimmer="blurring" open={this.props.modalOpen} onClose={this.props.handleClose} closeIcon>
			  <Modal.Header>{book.title}</Modal.Header>
			  <Modal.Content image scrolling>
			    <Image src={book.imageLink ? book.imageLink : coverImg } />
			    <Modal.Description>
			      <Header>{book.title} - {book.subtitle}</Header>
			      <p>{book.description}</p>
			      <p>Author : {book.authors}</p>
			      <p>Published On : {book.publishedDate}</p>
			      <p>Category : {book.categories}</p>
			      <p>Pages : {book.pageCount}</p>
			    </Modal.Description>
			  </Modal.Content>
			  <Modal.Actions>
	            <a href={book.infoLink} target="blank"><Button color='vk' content="More Info" /></a>
	          </Modal.Actions>
			</Modal>
		);
	}
}

// {type === 'add' &&
// 					<Button icon='plus' color='teal' content='Add to my books' />
// 				}
// 				{type === 'own' &&
// 					<Button icon='trash' inverted color='red' content='Remove from my book list' />
// 				}
// 				{type === 'wish' &&
// 					<Button icon='trash' inverted color='red' content='Remove from wish list' />
// 				}
// 				{type === 'add-to-wish' &&
// 					<Button icon='heart' inverted color='teal' content='Add to wish list' />
// 				}
// 				{type === 'req' &&
// 					<Button icon='reply' inverted color="blue" content='Back' />
// 				}

export default BookDetailsModal;