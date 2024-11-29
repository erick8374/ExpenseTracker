import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://placekitten.com/200/200' }}
              style={styles.profileImage}
            />
          </View>

          <Text style={styles.title}>Sobre Mim</Text>

          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Nome completo:</Text>
            <Text style={styles.infoValue}>Érick Landim de Paula</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>E-mail:</Text>
            <Text style={styles.infoValue}>185329@upf.br</Text>
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Descrição:</Text>
            <Text style={styles.description}>
              Sou um desenvolvedor apaixonado por tecnologia e aprendizado contínuo. Trabalho com desenvolvimento web, utilizando React, Node.js e outras tecnologias modernas. Estou sempre em busca de novos desafios e oportunidades de crescimento pessoal e profissional.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  contentContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  infoBlock: {
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    marginTop: 10,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
