import { Box, Button, TextField, Typography, Link } from "@mui/material";
import { styled } from "@mui/system";
import { api, handleErrors } from "@whub/api";
import { FormGroup, Img, ResponserGrid, useForm, Validators } from "@whub/wui";
import { useTranslation } from "react-i18next";

import PrivacyCheckBox from "../../../components/privacy_checkbox/PrivacyCheckbox";

const InvertedTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: '#d2d2d2',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#d2d2d2',
    },
    '&:hover fieldset': {
      borderColor: '#acacac',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#acacac',
    },
  },
}));

export default function Contacts() {
  const { t } = useTranslation();
  const form = useForm({
    name: {
      value: "",
      validators: [Validators.required],
    },
    surname: {
      value: "",
      validators: [Validators.required],
    },
    company: {
      value: "",
      validators: [],
    },
    phoneNumber: {
      value: "",
      validators: [],
    },
    email: {
      value: "",
      validators: [Validators.required],
    },
    message: {
      value: "",
      validators: [Validators.required],
    },
    privacy: {
      value: true,
      validators: [Validators.required],
    },
  });

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    form.validate();

    api.contactUs.process({
      name: form.getValue('name'),
      surname: form.getValue('surname'),
      email: form.getValue('email'),
      message: form.getValue('message'),
      phoneNumber: form.getValue('phoneNumber'),
    })
    .then(r => handleErrors(r, {
      onBadRequest: (e) => console.log(e),
      onProblem: (e) => console.log(e),
    }))
  };

  return (
    <Box
      sx={{
        backgroundImage: {
          md: "url('assets/images/circle.svg')",
          sm: "none",
          xs: "none",
        },
        paddingTop: "0px",
        borderRadius: {
          md: "0px",
          sm: "40px 0px 0px 40px",
          xs: "40px 40px 0px 0px",
        },
        backgroundRepeat: "no-repeat",
        justifyContent: "center",
        width: "100%",
        backgroundSize: "cover",
        marginTop: "0px",
        backgroundColor: { xs: "white", sm: "white", md: "transparent" },
      }}
    >
      <ResponserGrid
        type="upper"
        sx={{
          maxWidth: "1100px",
          minHeight: "800px",
          margin: "auto",
          paddingBottom: 4,
          paddingTop: "20px",
          width: "90%",
        }}
        size="xs"
      >
        <Box sx={{
          width: 500, 
          margin: "auto",
          maxWidth:"70%"
        }}>
          <Img
            src="assets/images/contactsIllustration.png"
            sx={{width:"100%", margin:"auto"}}
          /> 
        </Box>
        
        <Box sx={{ width: { sx: "95%", md: "50%" } }}>
          <Typography
            variant="h2"
            color="primary.dark"
            sx={{
              marginTop: "30px",
              textAlign: {
                md: "center",
                sm: "center",
                xs: "center",
                lg: "left",
              },
            }}
          >
            {t("contact-us-title")}
          </Typography>
          <Typography
            color="#757575"
            variant="body2"
            sx={{
              marginTop: "30px",
              marginBottom: "40px",
              textAlign: {
                md: "center",
                sm: "center",
                xs: "center",
                lg: "left",
              },
            }}
          >
            {t("contact-us-description")}
            <Link href="tel:+39 389 008 6632" sx={{color: "#757575", textDecoration: "none", borderBottom: "1px solid #757575"}}> +39 389 008 6632</Link>
          </Typography>
          <FormGroup form={form} onSubmit={handleSubmit}>
            <InvertedTextField
              name="name"
              required
              size="small"
              variant="outlined"
              label={t("name-and-surname")}
              sx={{marginBlock: 1,}}
              InputProps={{
                sx: { color: "#757575 !important", fontWeight: "600", fontSize: "18px !important", borderRadius: 2.5 },
              }}
              InputLabelProps={{ sx: { color: "#757575 !important", fontSize: "18px !important", borderRadius: 2.5 } }}
            />
            <InvertedTextField
              name="surname"
              required
              size="small"
              variant="outlined"
              label={t("name-and-surname")}
              sx={{marginBlock: 1,}}
              InputProps={{
                sx: { color: "#757575 !important", fontWeight: "600", fontSize: "18px !important", borderRadius: 2.5 },
              }}
              InputLabelProps={{ sx: { color: "#757575 !important", fontSize: "18px !important", borderRadius: 2.5 } }}
            />
            <InvertedTextField
              name="phoneNumber"
              fullWidth
              size="small"
              variant="outlined"
              label={t("phone-number")}
              sx={{marginBlock: 1}}
              InputProps={{
                sx: { color: "#757575 !important", fontSize: "18px !important", borderRadius: 2.5 },
              }}
              InputLabelProps={{ sx: { color: "#757575 !important", fontSize: "18px !important", borderRadius: 2.5 } }}
            />
            <InvertedTextField
              name="email"
              required
              size="small"
              fullWidth
              variant="outlined"
              label={t("email")}
              sx={{marginBlock: 1}}
              InputProps={{
                sx: { color: "#757575 !important", fontSize: "18px !important", borderRadius: 2.5 },
              }}
              InputLabelProps={{ sx: { color: "#757575 !important", fontSize: "18px !important", borderRadius: 2.5 } }}
            />
            <InvertedTextField
              name="message"
              required
              fullWidth
              size="small"
              multiline
              rows={4}
              variant="outlined"
              label={t("message")}
              sx={{marginBlock: 1, "& fieldset": {borderRadius: "16px !important"}}}
              inputProps={{ sx: { color: "#757575 !important", fontSize: "18px !important", borderRadius: "16px !important" } }}
              InputLabelProps={{ sx: { color: "#757575 !important", fontSize: "18px !important", borderRadius: "16px !important" } }}
            />
            <PrivacyCheckBox
              name="privacy"/>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{marginTop: "30px", width: "190px"}}
            >
              {t("contact-us-button")}
            </Button>
          </FormGroup>
        </Box>
      </ResponserGrid>
    </Box>
  );
}
