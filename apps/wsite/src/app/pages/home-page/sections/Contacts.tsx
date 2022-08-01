import { Box, Button, TextField, Typography, Link, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { api } from "@whub/api";
import { FormGroup, Img, ResponserGrid, useForm, Validators, WuiGrid } from "@whub/wui";
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
  const theme = useTheme()
  const borderRadius = theme.spacing(5)
  const textColor = theme.palette.grey[600]

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
    phoneNumber: {
      value: "",
      validators: [Validators.required, Validators.isATelephoneNumber],
    },
    email: {
      value: "",
      validators: [Validators.required, Validators.isAnEmail],
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

    api.contactUs.process(form.getValues());
  };

  const TextfieldBase = ({...props}) => {
    return (
      <InvertedTextField
        {...props}
        required
        size="small"
        variant="outlined"
        InputProps={{
          sx: { color: `${textColor} !important`},
        }}
        InputLabelProps={{ sx: { color: `${textColor} !important` } }}
      />
    )
  } 
 
  return (
    <Box
      sx={{
        backgroundColor: { xs: "white", sm: "white", md: "transparent" },
        backgroundImage: {
          md: "url('assets/images/circle.svg')",
          xs: "none",
        },
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingTop: 0,
        marginTop: 0,
        borderRadius: {
          md: 0,
          sm: `${borderRadius} 0px 0px ${borderRadius}`,
          xs: `${borderRadius} ${borderRadius} 0px 0px`,
        },
        width: "100%",
      }}
    >
      <ResponserGrid
        type="upper"
        sx={{
          maxWidth: 1100,
          minHeight: 800,
          margin: "auto",
          paddingBottom: 4,
          paddingTop: 2.5,
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
            sx={{ width:"100%", margin:"auto" }}
          /> 
        </Box>
        
        <WuiGrid
          container
          direction="column"
          spacing={4}
          sx={{ width: { sx: "95%", md: "50%" } }}
        >
          <Typography
            variant="h2"
            color="primary.dark"
            sx={{ textAlign: { xs: "center", lg: "left" } }}
          >
            {t("contact-us-title")}
          </Typography>
          <Typography
            color="#757575"
            variant="body2"
            sx={{ textAlign: { xs: "center", lg: "left" } }}
          >
            {t("contact-us-description")}
            <Link 
              href="tel:+39 389 008 6632" 
              sx={{
                color: textColor, 
                textDecoration: "none", 
                borderBottom: `1px solid ${textColor}`
              }}
            > 
              +39 389 008 6632
            </Link>
          </Typography>
          <FormGroup 
            form={form} 
            onSubmit={handleSubmit}
          >
            <InvertedTextField
              name="name"
              required
              size="small"
              variant="outlined"
              label={t("name-and-surname")}
              InputProps={{
                sx: { color: "#757575 !important"},
              }}
              InputLabelProps={{ sx: { color: "#757575 !important" } }}
            />
            <InvertedTextField
              name="surname"
              required
              size="small"
              variant="outlined"
              label={t("name-and-surname")}
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
        </WuiGrid>
      </ResponserGrid>
    </Box>
  );
}
