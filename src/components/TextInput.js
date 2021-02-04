import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../core/theme'

const TextInput2 = ({ errorText, description, ...props }) => (
  <View style={styles.container}>
    <Input
      // style={styles.input}
      // selectionColor={theme.colors.primary}
      // underlineColor="transparent"
      // mode="outlined"
      {...props}
    />
    {description && !errorText ? (
      <Text style={styles.description}>{description}</Text>
    ) : null}
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    height: 40, 
    width: 250,
    left:'10%',
    marginBottom:5,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    color: '#fff',
    fontSize:18,
    borderStyle:'solid',
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 8,
    left:'10%'
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
    left:'10%'
  },
})

export default TextInput2
