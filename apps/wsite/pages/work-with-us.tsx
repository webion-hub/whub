import OpenInNewRounded from '@mui/icons-material/OpenInNewRounded';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Link, Stack, Typography } from '@mui/material';
import { ClickableCard } from '@wui/components';
import Page from '@wui/layout/Page';
import PageSettings from '@wui/layout/PageSettings';
import Section from '@wui/layout/Section';
import Sections from '@wui/layout/Sections';
import useLanguage from '@wui/wrappers/useLanguage';
import { ReactNode, useState } from 'react';
import { TitleSectionLabel } from '../components/blocks/TitleSectionLabel';
import { WebionRepository } from '../lib/WebionRepositiory';


export default function WorkWithUs() {
  const { t } = useLanguage();
  return (
    <Page>
      <PageSettings pageTranslationName="work" />
      <Sections>
        <Section>
          <Stack
            direction="column"
            sx={{
              width: '100%',
              marginBlock: 1,
              paddingInline: 2,
            }}
          >
            <TitleSectionLabel
              label={t('work-with-us')} 
              title={t('work-with-us-title')}
              sx={{
                marginLeft: 1,
              }}
            />
            <Stack
              direction="column"
              flexWrap="wrap"
              justifyContent="center"
              spacing={2}
              sx={{
                width: '100%',
                marginTop: 4,
              }}
            >
              <JobCard
                title='Sviluppatore backend'
                date='08/02/2023'
                description={
                  <>
                    <b>Webion Srl</b> è una software house con sede a Modena in forte crescita nel panorama dello sviluppo software in Italia.
                    <br/>
                    Innovazione, strategia, qualità e formazione sono pilastri fondamentali della nostra società.
                    <br/>
                    L'azienda al raggiungimento di determinati obiettivi comuni offrirà al proprio personale viaggi con l'ottica di fare team building.
                    <br/>
                    <br/>
                    <b>Conoscenze richieste</b>
                    <ul>
                      <li>C#</li>
                      <li>AspNetCore</li>
                      <li>Git</li>
                      <li>Entity Framewokr</li>
                      <li>SQL</li>
                    </ul>
                    <br/>
                    <b>Conoscenze gradite ma non essenziali</b>
                    <ul>
                      <li>MongoDb</li>
                      <li>Razor</li>
                      <li>HTML/JS/CSS</li>
                      <li>Firebase</li>
                      <li>Python</li>
                      <li>Node.js</li>
                    </ul>
                    <br/>
                    <b>Offerta Junior Backend Developer</b>
                    <ul>
                      <li>contratto di assunzione a tempo determinato full-time (con prospettiva a tempo indeterminato nei mesi successivi);</li>
                      <li>pranzo in mensa/ristoranti convenzionati per i giorni in presenza;</li>
                      <li>smart working fino ad un 50% delle ore settimanali;</li>
                      <li>postazione in ufficio dotata di Mac Mini / MacBook Air;</li>
                      <li>utilizzo dell'area cucina con frigorifero, forno a microonde e piastra;</li>
                      <li>snack e bibite gratuite;</li>
                    </ul>
                    <br/>
                    Siamo interessati ad una collaborazione duratura, verrà inoltre fatta formazione interna.
                    <br/>
                    <i>Il presente annuncio è rivolto ad entrambi i sessi, ai sensi delle leggi 903/77 e 125/91, e a persone di tutte le età e tutte le nazionalità, ai sensi dei decreti legislativi 215/03 e 216/03.</i>
                  </>
                }
              />
              <JobCard
                title='Sviluppatore frontend'
                date='16/03/2023'
                description={
                  <>
                    <b>Webion Srl</b> è una software house con sede a Modena in forte crescita nel panorama dello sviluppo software in Italia.
                    <br/>
                    Innovazione, strategia, qualità e formazione sono pilastri fondamentali della nostra società.
                    <br/>
                    L'azienda al raggiungimento di determinati obiettivi comuni offrirà al proprio personale viaggi con l'ottica di fare team building.
                    <br/>
                    <br/>
                    <b>Conoscenze richieste</b>
                    <ul>
                      <li>React</li>
                      <li>Angular</li>
                    </ul>
                    <br/>
                    <b>Conoscenze gradite ma non essenziali</b>
                    <ul>
                      <li>NextJs</li>
                      <li>Flutter</li>
                      <li>React Native</li>
                    </ul>
                    <br/>
                    <b>Offerta Junior Frontend Developer</b>
                    <ul>
                      <li>contratto di assunzione a tempo determinato full-time (con prospettiva a tempo indeterminato nei mesi successivi);</li>
                      <li>pranzo in mensa/ristoranti convenzionati per i giorni in presenza;</li>
                      <li>smart working fino ad un 50% delle ore settimanali;</li>
                      <li>postazione in ufficio dotata di Mac Mini / MacBook Air;</li>
                      <li>utilizzo dell'area cucina con frigorifero, forno a microonde e piastra;</li>
                      <li>snack e bibite gratuite;</li>
                    </ul>
                    <br/>
                    Siamo interessati ad una collaborazione duratura, verrà inoltre fatta formazione interna.
                    <br/>
                    <i>Il presente annuncio è rivolto ad entrambi i sessi, ai sensi delle leggi 903/77 e 125/91, e a persone di tutte le età e tutte le nazionalità, ai sensi dei decreti legislativi 215/03 e 216/03.</i>
                  </>
                }
              />
            </Stack>
          </Stack>
        </Section>
      </Sections>
    </Page>
  );
}


interface JobCardProps {
  readonly title: string;
  readonly date: string;
  readonly description: ReactNode;
}

function JobCard(props: JobCardProps) {
  const [open, setOpen] = useState(false)

  const openEmail = () => {
    WebionRepository.openEmail({ subject: `Candidatura - ${props.title}` })
  }

  return (
    <>
      <ClickableCard
        onClick={() => setOpen(true)}
        buttonLabel='Scopri di più'
        buttonProps={{
          endIcon: <OpenInNewRounded/>
        }}
      >
        <Stack
          direction="column"
          spacing={1}
        >
          <Typography
            variant='h5'
          >
            {props.title}
          </Typography>
          <Typography
            variant='body2'
            color="text.secondary"
          >
            Data di pubblicazione {props.date}
          </Typography>
        </Stack>
      </ClickableCard>
      <Dialog 
        onClose={() => setOpen(false)} 
        open={open}
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <Stack
            direction="column" 
            spacing={2}
          >
            <Typography
              variant='body2'
              color="text.secondary"
            >
              Data di pubblicazione {props.date}
              <br/>
              Manda la tua candidatura a&nbsp;
              <Link
                href='#'
                onClick={openEmail}
              >
                {WebionRepository.EMAIL}
              </Link>
              <hr/>
            </Typography>
            <Typography>
              {props.description}
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setOpen(false)}
          >
            Chiudi
          </Button>
          <Button 
            variant='contained'
            onClick={openEmail} 
            autoFocus
          >
            Candidati
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}