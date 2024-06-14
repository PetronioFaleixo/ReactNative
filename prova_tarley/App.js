import { Text, SafeAreaView, StyleSheet } from 'react-native';

import {PessoasView} from './components/PessoaView';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
        <PessoasView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
  }
  
});
