import React, { useState, useEffect } from "react";
import { Box, TextField, Button, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import debounce from "lodash.debounce"; 

import BusinessPartnerList from "../components/BusinessPartnerList";
import BusinessPartnerForm from "../components/BusinessPartnerForm";
import { getBusinessPartners } from "../services/api";

const BusinessPartnerPage = () => {
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [businessPartners, setBusinessPartners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const fetchBusinessPartners = async (query = "") => {
    setLoading(true);
    try {
      const data = await getBusinessPartners(1, 10, query);
      setBusinessPartners(data.data);
    } catch (error) {
      console.error("Erro ao carregar parceiros de negócios", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery === "") {
      setBusinessPartners([]);  
    } else {
      debouncedSearch(searchQuery); 
    }
  }, [searchQuery]);

  const debouncedSearch = debounce(async (query) => {
    await fetchBusinessPartners(query);
  }, 500); 

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
        partners={businessPartners}
        loading={loading} 
        refresh={refresh}
      />

      {isOpenForm && (
        <BusinessPartnerForm partner={selectedPartner} onClose={handleCloseForm} />
      )}
    </Box>
  );
};

export default BusinessPartnerPage;
