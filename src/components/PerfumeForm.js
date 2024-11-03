import React, { useState } from 'react';
import './PerfumeForm.css';

const PerfumeForm = () => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasError, setHasError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const perfumeData = { name, notes };

    try {
      const response = await fetch('https://seu-backend-url.com/api/perfumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(perfumeData),
      });
      if (response.ok) {
        setSuccessMessage('Perfume cadastrado com sucesso!');
        setName('');
        setNotes('');
        setHasError(false);
      } else {
        setHasError(true);
        console.error('Erro ao cadastrar perfume');
      }
    }
    catch (error) {
      setHasError(true);
      setErrorMessage('Estamos atuando para melhorar a sua esperiência! Tente novamente mais tarde.');
      console.error('Erro ao conectar com o backend', error);
    }

    setIsSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {isSubmitted && (hasError ? (<p className="error-message">{errorMessage}</p>) : (<p className="success-message">{successMessage}</p>))}
      <div>
        <label>Nome do Perfume:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Notas Olfativas:</label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default PerfumeForm;
