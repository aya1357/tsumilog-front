import * as React from 'react'
import { Platform } from 'react-native'
import { Appbar } from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface HeaderProps {
  title?: string
}

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'

const Header = ({ title = 'Title' }: HeaderProps) => (
  <Appbar.Header style={{ backgroundColor: '#FBFBFD' }}>
    <Appbar.Content title={title} />
    <Appbar.Action
      icon={(props) => <MaterialIcons name="notifications-none" {...props} />}
      style={{ marginRight: -4 }}
    />
    <Appbar.Action icon={MORE_ICON} style={{ marginLeft: -4 }} />
  </Appbar.Header>
)

export default Header
