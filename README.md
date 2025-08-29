# 🍔 Delivery App - React Native

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo)
![React Navigation](https://img.shields.io/badge/React_Navigation-FF4154?style=for-the-badge&logo=react)

---

## 📌 Descrição

Aplicativo de delivery desenvolvido em **React Native**, com foco em ensino de desenvolvimento de aplicativos móveis.  
Permite criar conta, gerenciar usuário, navegar pelo menu, adicionar itens ao carrinho e visualizar a quantidade de itens em tempo real.

---

## ⚙️ Funcionalidades

### Autenticação
- Registro e login com e-mail e senha via **Firebase Authentication**.
- Armazenamento de informações do usuário no **Firestore** (`uid`, `email`, `nome`, `endereco`, `telefone`).

### Gerenciamento de Usuário
- Tela de perfil com visualização e edição de dados.
- Atualização de informações diretamente no **Firestore**.

### Carrinho de Compras
- Adição de itens com quantidade e total calculado.
- Aumento, diminuição e remoção de itens.
- Contador de itens no ícone do carrinho (Bottom Tab).

### Navegação
- **Stack Navigator** para telas principais: Login, Registro, Home, Order, Cart, User.
- **Bottom Tab Navigator** para Home, Order e Cart.
- Ícones personalizados com badges de quantidade.

---

## 🛠 Tecnologias Utilizadas

 ________________________________________________________________________________
| Tecnologia         |   Função                                                  |
|--------------------|-----------------------------------------------------------|
| React Native       | Framework principal para desenvolvimento mobile           |
| Expo               | Ferramenta para desenvolvimento, testes e execução do app |
| Firebase Auth      | Autenticação de usuários                                  |
| Firebase Firestore | Banco de dados para usuários e pedidos                    |
| React Navigation   | Navegação entre telas (Stack + Bottom Tabs)               |
| React Context API  | Gerenciamento do estado global do carrinho                |
|________________________________________________________________________________|

---

## 🚀 Como Executar

1. Clonar o repositório:  
git clone <url-do-repo>
2. Instalar dependências:
npm install
3.Rodar o app:
expo start
4.Abrir no dispositivo ou emulador (Android/iOS):
No dispositivo físico: escanear o QR code exibido no terminal ou navegador com o app Expo Go (Android/iOS).
No emulador: selecionar "Run on Android device/emulator" ou "Run on iOS simulator" no menu do Expo.

---

## 🗂 Estrutura do Projeto
/components       # Componentes reutilizáveis e contextos
/screens          # Telas do aplicativo
/assets           # Imagens e ícones
/firebaseConfig.js# Configuração do Firebase
/App.js           # Arquivo principal


