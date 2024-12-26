import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getBusinessPartners } from "../services/api";

const columns = [
  { id: 'cardCode', label: 'Card Code', minWidth: 170 },
  { id: 'cardName', label: 'Card Name', minWidth: 170 },
  { id: 'city', label: 'City', minWidth: 170 },
  { id: 'country', label: 'Country', minWidth: 170 },
];

const BusinessPartnerList = () => {
  const [businessPartners, setBusinessPartners] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalCount, setTotalCount] = React.useState(0);

  React.useEffect(() => {
    const fetchBusinessPartners = async () => {
      try {
        const response = await getBusinessPartners(page + 1, rowsPerPage);
        setBusinessPartners(response.data);
        setTotalCount(response.totalCount);
      } catch (err) {
        setError("Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessPartners();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {businessPartners.map((partner) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={partner.cardCode}>
                <TableCell>{partner.cardCode}</TableCell>
                <TableCell>{partner.cardName}</TableCell>
                <TableCell>{partner.city}</TableCell>
                <TableCell>{partner.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default BusinessPartnerList;
