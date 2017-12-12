import React, { Component } from 'react';
import { Container,Segment,Grid,List,Header,Divider, Button } from 'semantic-ui-react'
import "./footer.css";

class Footer extends Component {
	render() {
		return (
			<Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }} className="footer-root">
		      <Container textAlign='center'>
		        <Grid divided inverted stackable>
		          <Grid.Row>
		            <Grid.Column width={4} className="footer-box">
		              <Header inverted as='h4' content='PROJECT' />
		              <List link inverted>
		                <List.Item>A freeCodeCamp book trading project</List.Item>
		                <List.Item>Check project descriptions <a target="blank" href="https://www.freecodecamp.org/challenges/manage-a-book-trading-club">here</a></List.Item>
		              </List>
		            </Grid.Column>
		            <Grid.Column width={5} className="footer-box">
		              <Header inverted as='h4' content='TECH STACK' />
		              <List link inverted>
		                <List.Item>Front-end : React + Semantic UI React</List.Item>
		                <List.Item>Back-end : Express.js + MongoDB</List.Item>
		                <List.Item>External API : Google Books API</List.Item>
		              </List>
		            </Grid.Column>
		            <Grid.Column width={7} className="footer-box">
		              <Header inverted as='h4' content='AUTHOR : Kyaw Zin Tun' />
		              <List link inverted>
		                <List.Item>A web developer in Yangon</List.Item>
		                <List.Item className="contacts">Get in touch : &nbsp;
		                	<a href="https://github.com/kyawzintun"><Button circular icon="github"/></a>
		                	<a href="https://www.linkedin.com/in/kyawzintun/"><Button icon='linkedin' color="linkedin" circular /></a>
		                	<a href="https://facebook.com/cukyawzintun"><Button icon="facebook" color="facebook" circular /></a>
		                </List.Item>
		                <List.Item>View my portfolio : <a href="https://kyawzintun.github.io/portfolio">https://kyawzintun.github.io/portfolio</a></List.Item>
		              </List>
		            </Grid.Column>
		            
		          </Grid.Row>
		        </Grid>

		        <Divider inverted section />
		        <List horizontal inverted divided link>
		          <List.Item as='a' href='#'>By Kyaw Zin Tun , {new Date().getFullYear()}</List.Item>
		          <List.Item as='a' href='https://github.com/kyawzintun/book-club'>Github Repository</List.Item>
		        </List>
		      </Container>
		    </Segment>
		);
	}
}

export default Footer;
