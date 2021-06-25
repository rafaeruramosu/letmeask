import { useState, FormEvent } from 'react';

import { Link, useHistory } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

import { Helmet } from 'react-helmet';

import { useAuth } from '../../hooks/useAuth';

import { database } from '../../services/firebase';

import { Button } from '../../components/Button';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';

import './styles.scss';

export function NewRoom() {
  const [ roomName, setRoomName ] = useState('');

  const { user } = useAuth();
  
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if(roomName.trim() === '')
      return;

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: roomName,
      authorId: user?.id
    });

    toast.success('Room successfully created!');

    history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth" >
      <Helmet>
        <title>Criar sala | Letmeask</title>
      </Helmet>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        
        <strong>Crie salas de Q&amp;A ao-vivo</strong>

        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content" >
          <img src={logoImg} alt="Logo do Letmeask" />

          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala"
              onChange={event => setRoomName(event.target.value)}
              value={roomName}
            />

            <Button type="submit">
              Criar sala
            </Button>

          </form>
            
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}