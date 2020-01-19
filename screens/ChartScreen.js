import React, { Component } from 'react';
import { View, StyleSheet, Text, Picker } from 'react-native';

import Chart from '../components/Chart'

const serie = {
  favorableScenario : [ 0, 12, 20, 30, 40, 60, 90, 140, 200, 240, 260 ],
  moderateScenario : [ 0, 10, 13, 18, 25, 40, 60, 78, 100, 120, 160 ],
  unfavorableScenario : [ 0, 8, 10, 15, 20, 30, 40, 55, 60, 70, 85 ]
};

export default class ChartScreen extends Component {
  constructor () {
    super()
    this.state = {
      multiplyFactor: 1
    }
  }
  render(){
  return (
    <View>
      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          This is a setting bar. You can change charts:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <Text style={styles.codeHighlightText}>
            Select your risk profile
          </Text>
       
          <Picker
            selectedValue={this.state.multiplyFactor}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({multiplyFactor: itemValue})
            }>
            <Picker.Item label="Moderate" value="1" />
            <Picker.Item label="Agresive" value="2" />
          </Picker>
        </View>
      </View>
     <Chart serie={serie} multiplyFactor={this.state.multiplyFactor}/>
    </View>
)}
}

ChartScreen.navigationOptions = {
  title: 'Chart',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  navigationFilename: {
    marginTop: 5,
  },
  tabBarInfoContainer: {
    position: 'relative',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
});
