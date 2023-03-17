import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import { Card } from "../components/Card";
import { IconTitle } from "../components/IconTitle";
import { Section } from "../components/Section";
import { usePreview } from "../states/usePreview";

import GroupRoundedIcon from '@mui/icons-material/GroupRounded';


usePreview.setState({ 
  login: {
    ignore: true,
    description: 'Login',
    basePrice: 1500
  }
})

usePreview.setState({ 
  customize: {
    ignore: true,
    description: 'Personalizzazione profilo',
    basePrice: 1800
  } 
})

usePreview.setState({ 
  chat: {
    ignore: true,
    description: 'Chat tra gli utenti',
    basePrice: 2500
  } 
})


export function AuthSection() {
  const { toggle, isChecked, setChecked } = usePreview()

  const handleLogin = () => {
    toggle('login')
    setChecked('customize', false)
    setChecked('chat', false)
  }

  return (
    <Section id="auth">
      <Card>
        <Stack
          direction="column"
          spacing={4}
        >
          <IconTitle
            Icon={GroupRoundedIcon}
            text="Utenti"
          />
          <Stack
            direction="column"
            sx={{ "& > *": { marginTop: 2 } }}
          >
            <FormControlLabel 
              control={<Checkbox onChange={handleLogin}/>}
              checked={isChecked('login')}
              label="Hai bisogno di un login?" 
            />
            <FormControlLabel
              control={<Checkbox onChange={() => toggle('customize')}/>}
              disabled={!isChecked('login')}
              checked={isChecked('customize')}
              label="Gli utenti potranno modificare il proprio profilo?"
            />
            <FormControlLabel
              control={<Checkbox onChange={() => toggle('chat')}/>}
              disabled={!isChecked('login')}
              checked={isChecked('chat')}
              label="Gli utenti potranno communicare tra di loro?"
            />
          </Stack>
        </Stack>
      </Card>
    </Section>
  )
}




