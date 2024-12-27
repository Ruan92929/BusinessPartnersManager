import React, { useState, useEffect } from "react"; 
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"; 
import { createBusinessPartner, updateBusinessPartner } from "../services/api";  

const BusinessPartnerForm = ({ partner, onClose }) => {
  const [formData, setFormData] = useState({
    cardCode: "",
    cardName: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    if (partner) {
      setFormData({
        cardCode: partner.cardCode, 
        cardName: partner.cardName,
        city: partner.city,
        country: partner.country,
      });
    }
  }, [partner]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (partner) {
        await updateBusinessPartner(partner.cardCode, formData.cardName); 
      } else {
        await createBusinessPartner(formData); 
      }
      onClose();  
    } catch (error) {
      console.error("Erro ao salvar parceiro de negócios", error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>{partner ? "Editar parceiro" : "Criar novo parceiro"}</DialogTitle>
      <DialogContent>
        {}
        {partner && (
          <TextField
            label="Código"
            name="cardCode"
            value={formData.cardCode}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled 
          />
        )}
        <TextField
          label="Nome"
          name="cardName"
          value={formData.cardName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Cidade"
          name="city"
          value={formData.city}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled={!!partner} 
        />
        <TextField
          label="País"
          name="country"
          value={formData.country}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled={!!partner} 

        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {partner ? "Salvar" : "Criar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BusinessPartnerForm;
