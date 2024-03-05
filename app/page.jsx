"use client"
import FormularioEmpresa from '../components/FormularioEmpresa';
import ListaEmpresas from '../components/ListaEmpresas';

const IndexPage = () => {
  const agregarEmpresa = (empresa) => {
    setEmpresas(prevEmpresas => [...prevEmpresas, empresa]);
  };

  return (
    <div>
      <h1>¡Hola, Bienvenido a Genera tu Empresa!</h1>
      <h2>Rellena el formulario y explora la información de tu empresa</h2>
      <FormularioEmpresa onAgregarEmpresa={agregarEmpresa} />
      <ListaEmpresas />
    </div>
  );
};

export default IndexPage;
