import { useState, useEffect } from "react";
import axios from "axios";

const FormularioEmpresa = () => {
  const [empresas, setEmpresas] = useState([]);
  const [empresa, setEmpresa] = useState({
    id: "",
    nombre: "",
    nit: "",
    correo: "",
    direccion: "",
    telefono: "",
  });

  useEffect(() => {
    obtenerEmpresas();
  }, []);

  const obtenerEmpresas = async () => {
    try {
      const response = await axios.get("http://localhost:8000/empresas/");
      setEmpresas(response.data);
    } catch (error) {
      console.error("Error al obtener empresas:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresa((prevEmpresa) => ({
      ...prevEmpresa,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/empresas/",
        empresa
      );
      console.log(response.data); // Mensaje de confirmación
      obtenerEmpresas(); // Actualizar la lista de empresas
      // Limpiar el formulario después de enviar los datos
      setEmpresa({
        id: "",
        nombre: "",
        nit: "",
        correo: "",
        direccion: "",
        telefono: "",
      });
    } catch (error) {
      console.error("Error al agregar empresa:", error);
    }
  };

  const handleEditar = async (id) => {
    // Obtener los datos de la empresa a editar
    const empresaEditar = empresas.find((emp) => emp.id === id);
    setEmpresa(empresaEditar);
  };

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/empresas/${id}`);
      obtenerEmpresas(); // Actualizar la lista de empresas
      console.log(`Empresa con ID ${id} eliminada exitosamente`);
    } catch (error) {
      console.error("Error al eliminar empresa:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={empresa.id} />
        <input
          type="text"
          name="nombre"
          value={empresa.nombre}
          onChange={handleChange}
          placeholder="Nombre de la empresa"
          required
        />
        <input
          type="text"
          name="nit"
          value={empresa.nit}
          onChange={handleChange}
          placeholder="NIT"
          required
        />
        <input
          type="email"
          name="correo"
          value={empresa.correo}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
        />
        <input
          type="text"
          name="direccion"
          value={empresa.direccion}
          onChange={handleChange}
          placeholder="Dirección"
          required
        />
        <input
          type="tel"
          name="telefono"
          value={empresa.telefono}
          onChange={handleChange}
          placeholder="Teléfono"
          required
        />
        <button type="submit">Guardar Empresa</button>
      </form>

      <ul>
        {empresas.map((empresa) => (
          <li key={empresa.id}>
            <p>Nombre: {empresa.nombre}</p>
            <p>NIT: {empresa.nit}</p>
            <p>Correo: {empresa.correo}</p>
            <p>Dirección: {empresa.direccion}</p>
            <p>Teléfono: {empresa.telefono}</p>
            <button onClick={() => handleEditar(empresa.id)}>Editar</button>
            <button onClick={() => handleEliminar(empresa.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormularioEmpresa;
