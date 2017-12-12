import React, { Component } from 'react';
import { Image, Modal, Button, Header } from 'semantic-ui-react';
import coverImg from '../../assets/matthew.png';

class BookDetailsModal extends Component {
	render() {
		return (
			<Modal dimmer="blurring" open={this.props.modalOpen} onClose={this.props.handleClose} closeIcon>
			  <Modal.Header>Select a Photo</Modal.Header>
			  <Modal.Content image>
			    <Image wrapped size='medium' src={coverImg} />
			    <Modal.Description>
			      <Header>Default Profile Image</Header>
			      <p>We've found the following gravatar image associated with your e-mail address.</p>
			      <p>Is it okay to use this photo?</p>
			    </Modal.Description>
			  </Modal.Content>
			  <Modal.Actions>
	            <Button color='vk'>More Info</Button>
	            <Button icon='heart' color='teal' content='Add to wish list' />
	          </Modal.Actions>
			</Modal>
		);
	}
}

export default BookDetailsModal;