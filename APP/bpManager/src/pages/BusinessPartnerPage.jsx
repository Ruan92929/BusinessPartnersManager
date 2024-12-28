import React, { useState } from "react";
import { Box, TextField, Button, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import BusinessPartnerList from "../components/BusinessPartnerList";
import BusinessPartnerForm from "../components/BusinessPartnerForm";

const BusinessPartnerPage = () => {
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [refresh, setRefresh] = useState(false);

  const handleCreateClick = () => {
    setSelectedPartner(null);
    setIsOpenForm(true);
  };

  const handleEditClick = (partner) => {
    setSelectedPartner(partner);
    setIsOpenForm(true);
  };

  const handleCloseForm = () => {
    setIsOpenForm(false);
    setSelectedPartner(null);
    setRefresh(!refresh);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Box sx={{ margin: "0 auto", padding: 4, maxWidth: "1200px" }}>
      <Typography variant="h4" gutterBottom>
        Gerenciamento de Parceiros de Negócios
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        margin="0 auto"
        maxWidth="1136px"
        mb={-2}
      >
        <TextField
          placeholder="Pesquisar Parceiro"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: "200px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateClick}
          sx={{ width: "200px" }}
        >
          Novo Parceiro
        </Button>
      </Box>

      <BusinessPartnerList
        onEdit={handleEditClick}
        searchQuery={searchQuery}
        refresh={refresh}
      />

      {isOpenForm && (
        <BusinessPartnerForm partner={selectedPartner} onClose={handleCloseForm} />
      )}
    </Box>
  );
};

export default BusinessPartnerPage;
