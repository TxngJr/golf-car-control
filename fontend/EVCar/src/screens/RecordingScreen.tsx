import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { getRecords } from '../apis/api'
import { IRecord } from '../interfaces/IRecord'

type Props = {}

const RecordingScreen = (props: Props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getRecords();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient
      colors={['#C4E4F4', 'rgba(196, 228, 244, 0)']}
      locations={[0.2279, 0.72]}
      style={styles.container}
    >
      <View style={{ paddingLeft: 10, paddingTop: 50 }}>
        <Image
          source={require('./../assets/imgs/logo.png')}
          style={styles.image}
        />
      </View>
      <View style={{ width: 350, height: 600, backgroundColor: "#FFFFFF", alignSelf: 'center', borderRadius: 30 }}>
        <Text style={{ alignSelf: 'center', fontFamily: "THSarabunBold", fontSize: 36, color: "#000000",paddingTop:20 }}>History</Text>
        <ScrollView>
          {data.map((item: IRecord) => (
            <View key={item._id} style={{ width: 300, height: 150, backgroundColor: '#EDF5FA', marginVertical: 10, alignSelf: 'center', borderRadius:30,borderColor:'#90D6FA' ,borderWidth:1,alignItems:'center',justifyContent:'center'}}>
              <View style={{flexDirection:'row'}}><Text style={{ fontFamily: "THSarabunBold", fontSize: 30, color: "#000000" }}>เปิดรถ</Text><Text style={{ fontFamily: "THSarabunBold", fontSize: 23, color: "#000000" }}>{item.startTime}</Text></View>
              <View style={{flexDirection:'row'}}><Text style={{ fontFamily: "THSarabunBold", fontSize: 30, color: "#000000" }}>ปิดรถ</Text><Text style={{ fontFamily: "THSarabunBold", fontSize: 23, color: "#000000" }}>{item.endTime}</Text></View>
            </View>
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  )
}

export default RecordingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 152,
    height: 101,
  },
});