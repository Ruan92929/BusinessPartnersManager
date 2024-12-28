import React, { useState, useEffect } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, IconButton, TablePagination, Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getBusinessPartners, deleteBusinessPartner } from "../services/api";
import '../styles/App.css';

const columns = [
  { id: 'cardCode', label: 'Código' },
  { id: 'cardName', label: 'Nome' },
  { id: 'city', label: 'Cidade' },
  { id: 'country', label: 'País' },
];

const BusinessPartnerList = ({ onEdit, searchQuery, refresh }) => {
  const [businessPartners, setBusinessPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalCount, setTotalCount] = useState(0);

  const fetchBusinessPartners = async () => {
    setLoading(true);
    try {
      const data = await getBusinessPartners(page + 1, rowsPerPage, searchQuery);
      setBusinessPartners(data.data);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Erro ao carregar parceiros de negócios", error);
      setBusinessPartners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessPartners();
  }, [page, rowsPerPage, searchQuery, refresh]); 

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => setRowsPerPage(+event.target.value);

  const handleDelete = async (id) => {
    try {
      await deleteBusinessPartner(id);
      setBusinessPartners(businessPartners.filter((partner) => partner.cardCode !== id));
    } catch (error) {
      console.error("Erro ao deletar parceiro", error);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <Box sx={{ margin: "0 auto", padding: 4, maxWidth: "1250px" }}>
      <TableContainer className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {businessPartners && businessPartners.length > 0 ? (
              businessPartners.map((partner) => (
                <TableRow hover key={partner.cardCode}>
                  <TableCell>{partner.cardCode}</TableCell>
                  <TableCell>{partner.cardName}</TableCell>
                  <TableCell>{partner.city}</TableCell>
                  <TableCell>{partner.country}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => onEdit(partner)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(partner.cardCode)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center" className="empty-message">
                  Nenhum parceiro encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" alignItems="center" p={2}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default BusinessPartnerList;
