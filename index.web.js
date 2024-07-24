import { AppRegistry } from 'react-native';
import App from './App.web'
import { name as appName } from './app.json';
import { Platform } from 'react-native';

AppRegistry.registerComponent(appName, () => App);
if (Platform.OS === 'web') {
    AppRegistry.runApplication(appName, {
        initialProps: {},
        rootTag: document.getElementById('app'),
    });
}