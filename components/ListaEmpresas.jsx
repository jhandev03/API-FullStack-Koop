// Componente para la lista de la empresa
import { useState, useEffect } from 'react';
import axios from 'axios';

const ListaEmpresas = () => {
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    const obtenerEmpresas = async () => {
      try {
        const response = await axios.get('http://localhost:8000/empresas/');
        setEmpresas(response.data);
      } catch (error) {
        console.error('Error al obtener empresas:', error);
      }
    };

    obtenerEmpresas();
  }, []);

  const handleEliminarEmpresa = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/empresas/${id}`);
      setEmpresas(prevEmpresas => prevEmpresas.filter(empresa => empresa.id !== id));
    } catch (error) {
      console.error('Error al eliminar empresa:', error);
    }
  };

  return (
    <div>
      <h2>Empresas</h2>
      <ul>
        {empresas.map(empresa => (
          <li key={empresa.id}>
            <p>Nombre: {empresa.user_name}</p>
            <p>NIT: {empresa.user_nit}</p>
            <p>Dirección: {empresa.user_direccion}</p>
            <p>Correo electrónico: {empresa.user_correo}</p>
            <p>Número de teléfono: {empresa.user_phone_number}</p>
            <button onClick={() => handleEliminarEmpresa(empresa.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaEmpresas;
