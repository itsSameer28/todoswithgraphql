import React, { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import LoginSignup from './components/LoginSignup';
import AddTodos from './components/AddTodos.jsx';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Root = () => {
  const navigate = useNavigate();

  const [content, setContent] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(false);

  const [login, { data: loginData }] = useMutation(gql`
    mutation Login($email: String!, $password: String!) {
      token(email: $email, password: $password)
    }
  `);

  const [signup] = useMutation(gql`
    mutation Signup($email: String!, $password: String!) {
      createUser(email: $email, password: $password) {
        id
        email
      }
    }
  `);

  const handleLogin = (email, password) => {
    if (email && password) {
      login({ variables: { email: email, password: password } });
      if (login) {
        setIsLoginMode(true);
        navigate('/mytodos');
      }
    }
  };

  const handleSignup = (email, password) => {
    if (email && password) {
      signup({ variables: { email: email, password: password } });
    }
  };

  useEffect(() => {
    if (loginData?.token) {
      localStorage.setItem('token', loginData.token);
    }
  }, [loginData]);

  const { loading, error, data, refetch } = useQuery(gql`
    query UserTodos {
      userTodos {
        id
        content
        status
      }
    }
  `);

  const [createTodo] = useMutation(gql`
    mutation CreateTodo($content: String!) {
      createTodo(content: $content) {
        id
        content
        status
      }
    }
  `);

  const [updateTodo] = useMutation(gql`
    mutation UpdateTodo($id: ID!, $content: String, $status: String) {
      updateTodo(todo: { id: $id, content: $content, status: $status }) {
        id
        content
        status
      }
    }
  `);

  const [deleteTodo] = useMutation(gql`
    mutation DeleteTodo($id: ID!) {
      deleteTodo(id: $id)
    }
  `);

  const handleCreateTodo = async (content) => {
    if (content) {
      try {
        await createTodo({
          variables: { content }
        });
        refetch();
        setContent('');
      } catch (error) {
        console.log('Failed to create todo:', error);
      }
    }
  };

  const handleUpdateTodo = async (id, content, status) => {
    try {
      await updateTodo({
        variables: { id, content, status }
      });
      refetch();
    } catch (error) {
      console.log('Failed to update todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo({
        variables: { id }
      });
      refetch();
    } catch (error) {
      console.log('Failed to delete todo:', error);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LoginSignup 
          handleLogin={handleLogin} 
          handleSignup={handleSignup} 
          refetch={refetch} />
        }
      />
      <Route
        path="/addtodos"
        element={
          <AddTodos
            data={data}
            content={content}
            setContent={setContent}
            handleCreateTodo={handleCreateTodo}
            handleDeleteTodo={handleDeleteTodo}
            handleUpdateTodo={handleUpdateTodo}
            refetch={refetch}
          />
        }
      />
      <Route />
    </Routes>
  );
};
