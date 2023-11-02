import 'react-native-reanimated'
import 'react-native-gesture-handler'

import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet } from 'react-native';
import { AnimatePresence, MotiText, MotiView, ScrollView, View } from 'moti';
import { AntDesign } from '@expo/vector-icons';
import { Skeleton } from 'moti/skeleton';
import React, { useReducer } from 'react';

const Loop = () => {
  return (
    <MotiView 
      from={{
        translateY: -10,
      }}
      animate={{
        translateY: 0,
      }}
      transition={{
        loop: true,
        type: 'timing',
        duration: 1500,
        delay: 100,
      }}
      style={styles.loop}
    />
  )
}

const Shape = ({ bg, children }: { bg: string, children: React.ReactElement }) => {
  return (
    <View
      from={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
      style={[styles.shape, { backgroundColor: bg }]}
    >
      {children}
    </View>
  )
}

const MySkeleton = ({ dark, toogleDark }: { dark: boolean, toogleDark: () => void }) => {

  const colorMode = dark ? 'dark' : 'light'

  return (
    <Pressable onPress={toogleDark}>
      <MotiView
        transition={{
          type: 'timing'
        }}
        animate={{ backgroundColor: dark ? '#000' : '#ececec' }}
        style={[styles.skeleton, { padding: 16 }]}
      >
        <Skeleton colorMode={colorMode} radius='round' height={50} width={50} />
        <Skeleton colorMode={colorMode} height={20} width={100} />
        <Skeleton colorMode={colorMode} height={20} width={'100%'} />

      </MotiView>
    </Pressable>
  )
}

export default function App() {
  const [visibleShape, toogleShape] = useReducer((visible) => !visible, true)
  const [dark, toogleDark] = useReducer((dark) => !dark, true)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* top */}
        <MotiText
          style={styles.text}
          from={{
            opacity: 0,
            translateY: -100
          }}
          animate={{
            opacity: 1,
            translateY: 0
          }}
          transition={{
            delay: 500,
            type: 'timing',
            duration: 750
          }}
          >
          Top! {' .-.'}
        </MotiText> 

        {/* left */}
        <MotiText
          style={styles.text}
          from={{
            opacity: 0,
            translateX: -100
          }}
          animate={{
            opacity: 1,
            translateX: 0
          }}
          transition={{
            delay: 500,
            type: 'timing',
            duration: 650
          }}
        >
          Left! {'>'}
        </MotiText>

        {/* right */}
        <MotiText
          style={styles.text}
          from={{
            opacity: 0,
            translateX: 100
          }}
          animate={{
            opacity: 1,
            translateX: 0
          }}
          transition={{
            delay: 500,
            type: 'timing',
            duration: 750
          }}
        >
          Right! {'<'}
        </MotiText>

        {/* bottom */}
        <MotiText
          style={styles.text}
          from={{
            opacity: 0,
            translateY: 100
          }}
          animate={{
            opacity: 1,
            translateY: 0
          }}
          transition={{
            delay: 500,
            type: 'timing',
            duration: 750
          }}
        >
          Bottom! {'°.°'}
        </MotiText>

        <Pressable onPress={toogleShape} style={styles.Containershape}>
          <AnimatePresence exitBeforeEnter>
            {visibleShape && 
              <Shape bg='hotpink' key='hotpink'>
                <AntDesign name="like1" size={54} color="black" />
              </Shape>}
            {!visibleShape && 
              <Shape bg='cyan' key='cyan' >
                <AntDesign name="dislike1" size={54} color="black" />
              </Shape>}
          </AnimatePresence>
        </Pressable>

        <Loop />
        
        <MySkeleton dark={dark} toogleDark={toogleDark} />
        <StatusBar style="inverted" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222121',
    paddingHorizontal: 10,
    paddingVertical: 40
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginBottom: 50,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  Containershape: {
    height: 250,
    width: 250,
    borderRadius: 25,
    backgroundColor: '#8f4646',
    alignItems: 'center',
    justifyContent:'center'
  },
  shape: {
    height: 100,
    width: 100,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent:'center'
  },
  loop: {
    height: 100,
    width: 100,
    borderRadius: 100,
    backgroundColor: '#fff'
  },
  skeleton: {
    height: 165,
    width: "100%",
    borderRadius: 25,
    marginTop: 10,
    backgroundColor: '#ffffff',
    gap: 20
  }
});
