import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { Pessoas } from './Pessoas';
import { findAll, remove, save, update } from './PessoasCrud';

export function PessoasView() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    descricao: '',
    data: '',
    preco: '',
    pacienteNome: '',
    pacienteRg: '',
    pacienteEmail: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [editingContactId, setEditingContactId] = useState(null);
  const [buttonText, setButtonText] = useState("NOVO EXAME");

  const findContacts = async () => {
    try {
      const x = await findAll();
      setContacts(x);
    } catch (error) {
      console.error('Erro ao buscar os contatos:', error.message);
      alert('Erro ao buscar os contatos. Tente novamente mais tarde.');
    }
  };

  const onDelete = async (id) => {
    try {
      console.log('Excluindo o contato: ', id);
      await remove(id);
      alert('Contato excluído com sucesso!');
      await findContacts();
    } catch (error) {
      console.error('Erro ao excluir o contato:', error.message);
      alert('Erro ao excluir o contato. Tente novamente mais tarde.');
    }
  };

  const onEdit = async (id) => {
    setEditingContactId(id);
    const contactToEdit = contacts.find(contact => contact.id === id);
    setForm({
      descricao: contactToEdit.descricao,
      data: contactToEdit.data,
      preco: contactToEdit.preco.toString(),
      pacienteNome: contactToEdit.paciente.nome,
      pacienteRg: contactToEdit.paciente.rg.toString(),
      pacienteEmail: contactToEdit.paciente.email
    });
    setShowForm(true);
    setButtonText("EDITAR EXAME");
    await update(form.descricao, form.data, parseFloat(form.preco), {
        nome: form.pacienteNome,
        rg: parseInt(form.pacienteRg),
        email: form.pacienteEmail
      });
  };

  const onSave = async () => {
    try {
      await save(form.descricao, form.data, parseFloat(form.preco), {
        nome: form.pacienteNome,
        rg: parseInt(form.pacienteRg),
        email: form.pacienteEmail
      });
      alert('Exame salvo com sucesso!');
      await findContacts();
      setForm({
        descricao: '',
        data: '',
        preco: '',
        pacienteNome: '',
        pacienteRg: '',
        pacienteEmail: ''
      });
      setShowForm(false);
      setEditingContactId(null);
      setButtonText("NOVO EXAME");
    } catch (error) {
      console.error('Erro ao salvar o exame:', error.message);
      alert('Erro ao salvar o exame. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      {!showForm && (
        <View>
          <FlatList
            data={contacts}
            renderItem={({ item }) => (
              <Pessoas {...item} onDelete={() => onDelete(item.id)} onEdit={() => onEdit(item.id)} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
          <Button onPress={() => { setShowForm(true); setForm({ descricao: '', data: '', preco: '', pacienteNome: '', pacienteRg: '', pacienteEmail: '' }); }} style={styles.button}>
            <Text>{buttonText}</Text>
          </Button>
          <Button onPress={findContacts} style={styles.button}>
            <Text>BUSCAR TODOS EXAMES</Text>
          </Button>
        </View>
      )}
      {showForm && (
        <View>
          <Text style={styles.title}>{buttonText}</Text>
          <TextInput
            placeholder="Descrição"
            value={form.descricao}
            onChangeText={(text) => setForm({ ...form, descricao: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Data (YYYY-MM-DD)"
            value={form.data}
            onChangeText={(text) => setForm({ ...form, data: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Preço"
            value={form.preco}
            onChangeText={(text) => setForm({ ...form, preco: text })}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Nome do Paciente"
            value={form.pacienteNome}
            onChangeText={(text) => setForm({ ...form, pacienteNome: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="RG do Paciente"
            value={form.pacienteRg}
            onChangeText={(text) => setForm({ ...form, pacienteRg: text })}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Email do Paciente"
            value={form.pacienteEmail}
            onChangeText={(text) => setForm({ ...form, pacienteEmail: text })}
            style={styles.input}
          />
          <Button onPress={onSave} style={styles.button}>
            <Text>SALVAR ALTERAÇÕES</Text>
          </Button>
          <Button onPress={() => { setShowForm(false); setEditingContactId(null); }} style={styles.button}>
            <Text>CANCELAR</Text>
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: '#0FA6FB',
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    marginTop: 5,
    fontSize: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    padding: 10,
  },
});
