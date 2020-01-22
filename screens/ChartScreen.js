import React, { Component } from 'react';
import { View, StyleSheet, Text, Picker } from 'react-native';

import Chart from '../components/Chart'
const url = '';

function sanitizeSerie(response,){
  if(!response || !response.serie) return {};

  const serie = {
    favorableScenario: [],
    moderateScenario: [],
    unfavorableScenario: [],

  }
  const reduceFactor = 12 //MONTHS
  for (let i = 0; i < response.serie.length; i++) {
    if (i % reduceFactor === 0){
      serie.favorableScenario.push(response.serie[i].bestScenario.amount)
      serie.moderateScenario.push(response.serie[i].expectedScenario.amount)
      serie.unfavorableScenario.push(response.serie[i].worstScenario.amount)
    }
    
  }
  return serie;
}

export default class ChartScreen extends Component {
  constructor () {
    super()

    this.state = {
      isLoading: true,
      risk: 1,
      horizon: 10,
      serie: {
        favorableScenario: [],
        moderateScenario: [],
        unfavorableScenario: []
      }
    }
  }

  componentDidMount(){
    return fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        initialAmount: 10000,
        expectedPerformance: this.state.risk === 1 ? 0.08 : 0.12,
        expectedVolatility: this.state.risk === 1 ? 0.05 : 0.1,
        targetAmount: '250000',
        dateFrom: '20200122',
        dateTo: `${2020+this.state.horizon}0122`,
        periodicContributions: 250,
        contributionsFrequency: 'MONTHLY'
        }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('entra')
        const serieSanitized = sanitizeSerie(responseJson, this.state.horizon);
        this.setState({
          isLoading: false,
          serie: serieSanitized,
        });
      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render(){
    if (this.state.isLoading) return (<View><Text>Loading...</Text></View>)
    return (
      <View>
        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            Here are your answers:
          </Text>

          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <Text style={styles.codeHighlightText}>
              Risk profile
            </Text>
        
            <Picker
              selectedValue={this.state.risk}
              onValueChange={(itemValue) =>
                this.setState({risk: itemValue})
              }>
              <Picker.Item label="Moderate" value="1" />
              <Picker.Item label="Agresive" value="2" />
            </Picker>
          </View>
        </View>
      <Chart serie={this.state.serie} multiplyFactor={this.state.risk}/>
      </View>
    )
  }
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
    // alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 20,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'left'
  },
});
