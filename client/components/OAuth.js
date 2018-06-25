import React from 'react'
import { Button, View } from 'react-native'
import Expo from 'expo'

export default class OAuth extends React.Component {

  async signInWithGoogleAsync() {
    try {
      console.log('try block', process)
      const result = await Expo.Google.logInAsync({
        androidClientId: process.env.ANDROID_GOOGLE_CLIENT_ID,
        iosClientId: process.env.IOS_GOOGLE_CLIENT_ID,
        scopes: ['profile', 'email'],
      })

      if (result.type === 'success') {
        return result.accessToken
      } else {
        return { cancelled: true }
      }
    } catch (e) {
      return { error: true }
    }
  }


  render() {
    return (
      <View>
        <Button
          title="Open Google Auth"
          onPress={this.signInWithGoogleAsync.bind(this)}
        />
      </View>
    )

  }
}
