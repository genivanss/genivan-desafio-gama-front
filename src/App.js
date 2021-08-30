import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormInput = styled.input`
border: 1px solid red;

`;
const ErrorSpan = styled.span`
  color: red;
  display: ${(props) => props.isError ? 'block' : 'none'};
`;

const App = () => {

  const fetchAddress = async () => {
    const address = await axios.get(`https://viacep.com.br/ws/${form.cep}/json/`);
    setForm({ ...form, logradouro: address.data.logradouro });
  };

  const createCandidate = async (candidate) => {
    try {
      const user = await axios.post('https://genivan-desafio-gama-back.herokuapp.com/register', form);
      if (user.status === 200) {
        alert('Cadastro realizado com sucesso!');
      }

    } catch (error) {
      setCpfError(true);
    }
  };

  const [form, setForm] = useState({
    name: '',
    cep: '',
    logradouro: '',
    email: '',
    gender: '',
  });

  const [cpfError, setCpfError] = useState(false);

  return (
    <div>
      <div>
        <label>Nome</label><br/>
        <FormInput onChange={(e) => {
          setForm({ ...form, name: e.target.value });
        }} value={form.name}></FormInput><br/><br/>
      </div>
      <div>
        <label>Cep</label><br/>
        <FormInput onBlur={() => {
          fetchAddress();
        }} onChange={(e) => {
          setForm({ ...form, cep: e.target.value });
        }} value={form.cep}></FormInput><br/><br/>
      </div>
      <div>
        <label>Endereço</label><br/>
        <FormInput onChange={(e) => {
          setForm({ ...form, logradouro: e.target.value });
        }} value={form.logradouro}></FormInput><br/><br/>
      </div>
      <div>
        <label>E-mail</label><br/>
        <FormInput onChange={(e) => {
          setForm({ ...form, email: e.target.value });
        }} value={form.email}></FormInput>
        <ErrorSpan isError={cpfError}>E-mail duplicado!</ErrorSpan><br/><br/>
      </div>

      <div>
        <label>Gênero</label><br/>
        <FormInput onChange={(e) => {
          setForm({ ...form, gender: e.target.value });
        }} value={form.gender}></FormInput><br/><br/>
      </div>

      <button onClick={() => createCandidate()}>Enviar</button>
    </div>

  );
};

export default App;
