import { StatusBar, Text, View } from 'react-native';
import { SQLiteProvider } from 'expo-sqlite';  
import { DATABASE_NAME, initDd } from './src/db/database';
import { colors } from './src/styles/theme';
import RegisterScreen from './src/screens/RegisterScreen';
import { styles } from './src/styles/appStyles';

export default function App() {
  return (
    <>
 <StatusBar barStyle="light-content" backgroundColor={colors.cyan} />
      <SQLiteProvider databaseName={DATABASE_NAME} onInit={initDd}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>ระบบลงทะเบียนนิสิต</Text>
          </View>
          <RegisterScreen />
        </View>
      </SQLiteProvider>
    </>
  );
}

//<View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
      //  <Text style={{ color: colors.green, fontSize: 18 }}> ฐานข้อมูลพร้อมแล้ว       </Text>
      //</View>