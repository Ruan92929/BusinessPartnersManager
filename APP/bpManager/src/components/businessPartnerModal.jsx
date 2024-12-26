import React, { useState, useEffect } from "react";
import { createBusinessPartner, updateBusinessPartner, fetchPaginatedBusinessPartners } from "../services/api"; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, TextField, Paper } from "@mui/material";
import "../App.css";

const BusinessPartnerModal = ({ isOpen, onClose, partnerData, onSave }) => {
  const [formData, setFormData] = useState(partnerData || { cardCode: "", cardName: "", city: "", country: "" });
  const [businessPartners, setBusinessPartners] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [filter, setFilter] = useState("");  // Filtro único
  const [totalCount, setTotalCount] = useState(0);

  // Função para capturar a mudança no filtro (campo de busca)
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(0); // Resetar para a primeira página ao mudar o filtro
  };

  // Função para atualizar os dados da tabela (com paginação e filtro)
  const fetchData = async () => {
    try {
      const response = await fetchPaginatedBusinessPartners(page + 1, pageSize, filter);  // Passa o filtro como parâmetro
      setBusinessPartners(response.data);
      setTotalCount(response.totalCount); // Assume-se que a API retorna o total de itens
    } catch (err) {
      console.error("Erro ao carregar dados", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize, filter]); // Atualiza os dados sempre que a página, o tamanho da página ou o filtro mudarem

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);  // Resetar para a primeira página ao mudar a quantidade de itens por página
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (partnerData) {
        await updateBusinessPartner(formData);
      } else {
        await createBusinessPartner(formData); 
      }
      onSave(); 
      onClose(); 
    } catch (err) {
      console.error("Erro ao salvar", err);
    }
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>{partnerData ? "Editar" : "Criar"} Business Partner</h2>

          <div className="form-group">
            <label>Card Code:</label>
            <input
              className="sap-input"
              type="text"
              name="cardCode"
              value={formData.cardCode}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Card Name:</label>
            <input
              className="sap-input"
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>City:</label>
            <input
              className="sap-input"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Country:</label>
            <input
              className="sap-input"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          <div className="modal-actions">
            <button className="sap-button" onClick={handleSubmit}>
              {partnerData ? "Atualizar" : "Criar"}
            </button>
            <button className="sap-button" onClick={onClose}>Cancelar</button>
          </div>

          {/* Campo de busca único */}
          <TextField
            label="Buscar"
            variant="outlined"
            value={filter}
            onChange={handleFilterChange}  // Atualiza o filtro
            fullWidth
            style={{ marginBottom: "20px" }}
          />

          {/* Tabela com paginação e filtro */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Card Code</TableCell>
                  <TableCell>Card Name</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Country</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {businessPartners.map((partner) => (
                  <TableRow key={partner.cardCode}>
                    <TableCell>{partner.cardCode}</TableCell>
                    <TableCell>{partner.cardName}</TableCell>
                    <TableCell>{partner.city}</TableCell>
                    <TableCell>{partner.country}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={pageSize}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        </div>
      </div>
    )
  );
};

export default BusinessPartnerModal;
