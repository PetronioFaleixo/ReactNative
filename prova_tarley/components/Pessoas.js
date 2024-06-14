import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function Pessoas({ 
  preco, 
  data, 
  paciente, 
  id, 
  descricao, 
  onDelete,
  onEdit 
}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text>Nome: {paciente.nome}</Text>
        <Text>RG: {paciente.rg}</Text>
        <Text>Email: {paciente.email}</Text>
        <Text>Preço: {preco}</Text>
        <Text>Data: {data}</Text>
        <Text>Descrição: {descricao}</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={onDelete} style={[styles.button, { backgroundColor: 'red' }]}>
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onEdit} 
          style={[styles.button, { backgroundColor: '#0FA6FB' }]}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  titleContainer: {
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    padding: 5,
    borderRadius: 5,
    width: '48%', 
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
