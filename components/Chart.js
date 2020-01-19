import React from 'react';
import { View } from 'react-native';

import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'

const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 10 }
const xAxisHeight = 30

let data = [];



function getSerie(props) {
 const favorableScenario = props.serie.favorableScenario.map( item => item * props.multiplyFactor)
 const moderateScenario = props.serie.moderateScenario.map( item => item )
 const unfavorableScenario = props.serie.unfavorableScenario.map( item => item / props.multiplyFactor)

  const mockData = [
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
  return mockData;
}

export default function Chart(props) {
  if(!props.serie){
    return <View/>
  }
  const serie = getSerie(props);
  return (
    <View style={{ height: 300, padding: 10, flexDirection: 'row' }}>
    <YAxis
        data={serie[0].data}
        style={{ marginBottom: xAxisHeight }}
        contentInset={verticalContentInset}
        svg={axesSvg}
    />
    <View style={{ flex: 1, marginLeft: 10 }}>
        <LineChart
            style={{ flex: 1, }}
            data={serie}
            contentInset={verticalContentInset}
            animate={true}
        >
            <Grid/>
        </LineChart>
        <XAxis
            style={{ marginHorizontal: -10, height: xAxisHeight }}
            data={serie[0].data}
            formatLabel={(value, index) => index}
            contentInset={{ left: 10, right: 10 }}
            svg={axesSvg}
            
        />
    </View>
</View>
  );
}
