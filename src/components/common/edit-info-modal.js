import React, { Component } from 'react';
import { Modal, Button, Header, Form, Input } from 'semantic-ui-react';

class EditInfoModal extends Component {
	render() {
		return (
			<Modal dimmer="blurring" size="tiny" className="userinfo-edit-modal" open={this.props.infoModalOpen} onClose={this.props.handleClose} closeIcon>
			  <Modal.Header>Edit Your Information</Modal.Header>
			  <Modal.Content>
			    <Modal.Description>
			      <Header as='h1'>Kyaw Zin Tun</Header>
			      <Form>
				    <Form.Field>
				      <label color="black">Email</label>
					  <Input icon='mail' size="big" iconPosition='left' placeholder='Email...' />
				    </Form.Field>
				    <Form.Field>
				      <label color="black">Address</label>
				      <Input icon='marker' size="big" iconPosition='left' placeholder='Address...' />
				    </Form.Field>
				  </Form>
			    </Modal.Description>
			  </Modal.Content>
			  <Modal.Actions>
	            <Button basic color='black'>Cancel</Button>
	            <Button icon='checkmark' positive content='Update' />
	          </Modal.Actions>
			</Modal>
		);
	}
}

export default EditInfoModal;