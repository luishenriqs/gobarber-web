import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 } from 'uuid';
import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'info' | 'success' | 'error';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(messages: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = v4();

      const toast = {
        id,
        type,
        title,
        description,
      };
      /* OBS: Se o novo valor de um estado é passado (setado) através de um
      função, recebemos como parâmetro o valor antigo */
      setMessages(oldMessages => [...oldMessages, toast]);
    },
    [],
  );

  /* *********************[DESCRIPTION REMOVETOAST]*****************************
  O método removeToast recebe como parâmetro o 'id' do toast a ser removido,
  daí faz um '.filter' que retorna para ser setado como um novo estado das
  messages apenas as messages dos toasts com ids diferentes do enviado no
  parâmetro;
  *************************************************************************** */
  const removeToast = useCallback((id: string) => {
    setMessages(oldMessages =>
      oldMessages.filter(message => message.id !== id),
    );
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }
  return context;
}

export { ToastProvider, useToast };
