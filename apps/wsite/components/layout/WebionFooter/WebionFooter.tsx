import CallRounded from '@mui/icons-material/CallRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Button, IconButton, Link, Stack, Typography } from '@mui/material';
import { useNextNavigator } from '@wui/core';
import { Footer, FooterContent } from '@wui/layout/Footer';
import useLanguage from '@wui/wrappers/useLanguage';
import { WebionRepository } from '../../../lib/WebionRepositiory';
import { FooterLink } from './FooterLink';
import { LinksFooterColumn } from './LinksFooterColumn';
import { WebionFooterBottomLabel } from './WebionFooterBottomLabel';

export default function WebionFooter() {
  const { clickNavigate } = useNextNavigator();
  const { t } = useLanguage();

  const socials = [
    {
      href: WebionRepository.LINKEDIN,
      icon: <LinkedInIcon fontSize="inherit" aria-label="linkedin button" />,
    },
    {
      href: WebionRepository.GITHUB,
      icon: <GitHubIcon fontSize="inherit" aria-label="github button" />,
    },
  ];

  return (
    <Footer>
      <FooterContent>
        <LinksFooterColumn>
          <Typography
            variant="h5"
            sx={{
              color: '#fff',
              marginBottom: (theme) => theme.spacing(2, '!important'),
            }}
          >
            {t('footer-title1')}
          </Typography>
          <FooterLink href={WebionRepository.MAPS_ADDRESS} target="_blank">
            {WebionRepository.ADDRESS}
          </FooterLink>
          <FooterLink href={WebionRepository.HREF_PHONE}>
            {WebionRepository.PHONE}
          </FooterLink>
          <FooterLink href={WebionRepository.HREF_EMAIL}>
            {WebionRepository.EMAIL}
          </FooterLink>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<CallRounded />}
            sx={{ marginTop: (theme) => theme.spacing(6, '!important') }}
            href="/contact-us"
            onClick={clickNavigate('/contact-us')}
          >
            {t('footer-col1-action-btn')}
          </Button>
        </LinksFooterColumn>
        <LinksFooterColumn>
          <Typography
            variant="h5"
            sx={{
              color: '#fff',
              marginBottom: (theme) => theme.spacing(2, '!important'),
            }}
          >
            {t('footer-title2')}
          </Typography>
          <FooterLink href="/#home" onClick={clickNavigate('/#home')}>
            {t('footer-col2-label1')}
          </FooterLink>
          <FooterLink href="/who-we-are" onClick={clickNavigate('/who-we-are')}>
            {t('footer-col2-label2')}
          </FooterLink>
          <FooterLink href="/projects" onClick={clickNavigate('/projects')}>
            {t('footer-col2-label3')}
          </FooterLink>
          <FooterLink href="/techs" onClick={clickNavigate('/techs')}>
            {t('footer-col2-label4')}
          </FooterLink>
        </LinksFooterColumn>
        <LinksFooterColumn>
          <Typography
            variant="h5"
            sx={{
              color: '#fff',
              marginBottom: (theme) => theme.spacing(2, '!important'),
            }}
          >
            {t('footer-title3')}
          </Typography>
          <FooterLink
            href="/services/apps"
            onClick={clickNavigate('/services/apps')}
          >
            {t('service2')}
          </FooterLink>
          <FooterLink
            href="/services/industry"
            onClick={clickNavigate('/services/industry')}
          >
            {t('service3')}
          </FooterLink>
        </LinksFooterColumn>
        <LinksFooterColumn>
          <Typography
            variant="h5"
            width="100%"
            textAlign="center"
            sx={{
              color: '#fff',
              marginBottom: (theme) => theme.spacing(2, '!important'),
            }}
          >
            {t('footer-title4')}
          </Typography>
          <Stack direction="row" alignSelf="center">
            {socials.map((s, i) => (
              <IconButton
                size="large"
                href={s.href}
                target="_blank"
                color="primary"
                key={i}
                aria-label="button"
              >
                {s.icon}
              </IconButton>
            ))}
          </Stack>
        </LinksFooterColumn>
      </FooterContent>
      <WebionFooterBottomLabel/>
    </Footer>
  );
}
