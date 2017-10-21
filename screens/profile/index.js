import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Header, Content,
   List, ListItem, Text, Icon, 
   Left, Body, Right, Switch, Title,
   Thumbnail } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import defaultPic from './icons/emoji.png'

export default class App extends React.Component {
  render() {

    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Text style={styles.rating}>Rating</Text>
          </Left>
          <Body>
            <Title>Username</Title>
          </Body>
          <Right>
            <Text style={styles.money}>$300.00</Text>
          </Right>
        </Header>
          <Content>
            <Grid>
              <Row style={styles.topRow}>
                <Body>
                  <Thumbnail large source={defaultPic} />
                </Body>
              </Row>
              <Row>
                <List style={styles.list}>
                  <ListItem icon>
                    <Body>
                      <Text>User 1</Text>
                    </Body>
                    <Right>
                      <Text>+$1.00</Text>
                    </Right>
                  </ListItem>
                  <ListItem icon>
                    <Body>
                      <Text>User 2</Text>
                    </Body>
                    <Right>
                      <Text>-$1.00</Text>
                    </Right>
                  </ListItem>
                  <ListItem icon>
                    <Body>
                      <Text>AC Transit</Text>
                    </Body>
                    <Right>
                      <Text>+$300.00</Text>
                    </Right>
                  </ListItem>
                </List>
              </Row>
            </Grid>
          </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242424',
  },
  username: {
    color: '#FAFAFA',
    fontSize: 45
  },
  rating: {
    color: '#03A9F4',
    fontSize: 20
  },
  money: {
    color: '#009688',
    fontSize: 20
  },
  item: {
    color: '#FAFAFA',
    padding: 10,
    fontSize: 18,
  },
  list: {
    width: '100%'
  }, 
  topRow: {
    padding: 20
  }
});
