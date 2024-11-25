import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native'
import Botao from './Botao'
import { Image } from 'expo-image'

interface ContadorComponentProps {
    title: string,
}

const Contador: React.FC<ContadorComponentProps> = ({ title }) => {
  const [counter, setCounter] = useState(0)
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height
  
  const incrementar = () => {
    setCounter(prev => (prev < 24 ? prev + 1 : prev))
  }

  const decrementar = () => {
    setCounter(prev => (prev > 0 ? prev - 1 : prev))
  }

  const resetar = () => {
    setCounter(0)
  }

  const images = [
    require('../assets/images/placar/0.jpg'),
    require('../assets/images/placar/1.jpg'),
    require('../assets/images/placar/2.jpg'),
    require('../assets/images/placar/3.jpg'),
    require('../assets/images/placar/4.jpg'),
    require('../assets/images/placar/5.jpg'),
    require('../assets/images/placar/6.jpg'),
    require('../assets/images/placar/7.jpg'),
    require('../assets/images/placar/8.jpg'),
    require('../assets/images/placar/9.jpg'),
    require('../assets/images/placar/10.jpg'),
    require('../assets/images/placar/11.jpg'),
    require('../assets/images/placar/12.jpg'),
    require('../assets/images/placar/13.jpg'),
    require('../assets/images/placar/14.jpg'),
    require('../assets/images/placar/15.jpg'),
    require('../assets/images/placar/16.jpg'),
    require('../assets/images/placar/17.jpg'),
    require('../assets/images/placar/18.jpg'),
    require('../assets/images/placar/19.jpg'),
    require('../assets/images/placar/20.jpg'),
    require('../assets/images/placar/21.jpg'),
    require('../assets/images/placar/22.jpg'),
    require('../assets/images/placar/23.jpg'),
    require('../assets/images/placar/24.jpg'),
  ]

  return (
    <View style={[styles.container, { width: screenWidth / 2, height: screenHeight / 2 }]}>
      <View style={styles.content}>
        <Image source={images[counter]} style={styles.image} />
        <View style={styles.leftContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Botao title="+" onPress={incrementar} />
            <Botao title="-" onPress={decrementar} />
            <Botao title="0" onPress={resetar} />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    position: 'relative',
  },
  image: {
    width: '140%',
    height: '100%',
  },
  leftContainer: {
    flexDirection: 'row',
    height: '100%',
    padding: 5
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    transform: [{ rotate: '-90deg' }],
    paddingBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
    padding: 5,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Contador