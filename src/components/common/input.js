import React, { Component } from 'react';
import { Form, Input,Label } from 'semantic-ui-react';

class MyInput extends Component {
  render() {
    return (
        <Form.Field>
          <Input 
            onChange={this.props.changeValue} 
            name={this.props.name} 
            type={this.props.type || 'text'} 
            value={this.props.value}
            icon={this.props.icon}
            size='big'
            iconPosition='left'
            placeholder={this.props.placeholder}
            minLength={this.props.minLength ? this.props.minLength : null}
            maxLength={this.props.maxLength ? this.props.maxLength : null}
            autoFocus={this.props.autoFocus ? this.props.autoFocus : null}
            autoComplete='off'
            required/>
          { this.props.error && 
            <Label basic color='red' pointing>{this.props.error}</Label>
          } 
        </Form.Field>
    );
  }
}

export default MyInput;

