'use strict';
var React = require('react');
var {
  AppRegistry,
  Dimensions,
  Image,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} = require('react-native');

var Lightbox = require('react-native-lightbox');

var WINDOW_WIDTH = Dimensions.get('window').width;
var BASE_PADDING = 10;

var Example = React.createClass({

  navigate(id) {
    this.props.navigator.push({
        id: id,
        component: LightboxView1
    })
  },


  render: function() {
    
    return (
      <ScrollView style={styles.container}>
        <View style={styles.text}><Text>Test Text 1</Text></View>
        
        <Lightbox navigator={this.props.navigator}
          renderHeader={close => (
            <TouchableOpacity onPress={close}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          )}>
          <View style={styles.row}>
          <View style={styles.customHeaderBox}><Text>I have a custom header</Text></View>
          <Image
          style={styles.contain}
          resizeMode="contain"
          source={{uri:'https://www.yayomg.com/wp-content/uploads/2014/04/yayomg-pig-wearing-party-hat.jpg'}}
          />
          </View>
        </Lightbox>
  
       <TouchableHighlight onPress={ () => this.navigate('second') } style={ styles.button }>
         <Text>Second View</Text>
       </TouchableHighlight>
      </ScrollView>
    );
  },
});

var LightboxView1 = React.createClass({

  render: function() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.text}>
          <Text>Lighbox view 1: some example text</Text>
        </View>
        <Lightbox underlayColor="white" navigator={this.props.navigator}>
          <Image
          style={styles.contain}
          resizeMode="contain"
          source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Everest_kalapatthar_crop.jpg'}}
          />
         </Lightbox>
        <TouchableHighlight onPress={ () => this.props.navigator.pop()}>
            <Text>First View</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  },
});



var LightBoxProject = React.createClass({

  _renderScene: function(route, navigator){
  if(route.component) {
    var Component = route.component;
    return (<Component navigator={navigator} route={route} {...route.passProps} />);
  }
   switch(route.id){
    case "first":
      return(<Exmaple navigator={navigator} />);
    case "second":
      return (<LightboxView1 navigator={navigator}/>);
  }
},

  render: function() {
    
    return (
      <Navigator
        ref="navigator"
        style={styles.navigator}
        renderScene={this._renderScene}
        initialRoute={{ id: 'first', component: Example}}
      />
    );
  }
});

var styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  container: {
    paddingHorizontal: BASE_PADDING,
  },
  closeButton: {
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    padding: 8,
    borderRadius: 3,
    textAlign: 'center',
    margin: 10,
    alignSelf: 'flex-end',
  },
  customHeaderBox: {
    height: 150,
    backgroundColor: '#6C7A89',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginLeft: -BASE_PADDING,
    marginRight: -BASE_PADDING,
  },
  col: {
    flex: 1,
  },
  square: {
    width: WINDOW_WIDTH/2,
    height: WINDOW_WIDTH/2,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  squareFirst: {
    backgroundColor: '#C0392B',
  },
  squareSecond: {
    backgroundColor: '#019875',
  },
  squareText: {
    textAlign: 'center',
    color: 'white',
  },
  carousel: {
    height: WINDOW_WIDTH - BASE_PADDING * 2,
    width: WINDOW_WIDTH - BASE_PADDING * 2,
    backgroundColor: 'white',
  },
  contain: {
    flex: 1,
    height: 150,
  },
  text: {
    marginVertical: BASE_PADDING*2,
  },

  button: {
    height: 50,
    backgroundColor: '#ededed',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = Example;


AppRegistry.registerComponent('LightBoxProject', () => LightBoxProject);
