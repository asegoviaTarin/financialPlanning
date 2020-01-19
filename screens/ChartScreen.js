import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'

const favorableScenario = [ 0, 12, 20, 30, 40, 60, 90, 140, 200, 240, 260 ]
const moderateScenario = [ 0, 10, 13, 18, 25, 40, 60, 78, 100, 120, 160 ]
const unfavorableScenario = [ 0, 8, 10, 15, 20, 30, 40, 55, 60, 70, 85 ]

const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 10 }
const xAxisHeight = 30

const data = [
    {
        data: favorableScenario,
        svg: { stroke: 'green' },
    },
    {
        data: moderateScenario,
        svg: { stroke: '#8800cc' },
    },
    {
      data: unfavorableScenario,
      svg: { stroke: 'red' },
  },
]

export default function ChartScreen() {
  return (
    <View>
      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>
          This is a setting bar. You can change charts:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.navigationFilename]}>
          <Text style={styles.codeHighlightText}>
            Chart configuration is avaliable soon...
          </Text>

        </View>
      </View>
      <View style={{ height: 300, padding: 10, flexDirection: 'row' }}>
          <YAxis
              data={favorableScenario}
              style={{ marginBottom: xAxisHeight }}
              contentInset={verticalContentInset}
              svg={axesSvg}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
              <LineChart
                  style={{ flex: 1 }}
                  data={data}
                  contentInset={verticalContentInset}
                  svg={{ stroke: 'rgb(134, 65, 244)' }}
              >
                  <Grid/>
              </LineChart>
              <XAxis
                  style={{ marginHorizontal: -10, height: xAxisHeight }}
                  data={favorableScenario}
                  formatLabel={(value, index) => index}
                  contentInset={{ left: 10, right: 10 }}
                  svg={axesSvg}
              />
          </View>
      </View>
    </View>
)
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
