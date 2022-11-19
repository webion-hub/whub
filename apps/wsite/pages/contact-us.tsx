import { BusinessRounded, DevicesRounded, FactoryRounded, PersonRounded, PhoneIphoneRounded, QuestionMarkRounded, StoreRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useContactUs } from '@whub/apis-react';
import { MaybeShow, Page, PrivacyCheckBox, Section, Sections, useLanguage, useNextNavigator, Validator, Validators } from '@whub/wui';
import _ from 'lodash';
import { ReactNode, useState } from 'react';
import { SelectableCard } from '../components/cards/SelectableCard';

interface CardOptionProps {
  readonly selected: boolean;
  readonly onSelect: () => void;
  readonly icon: ReactNode;
  readonly title: string;
  readonly label: string;
}

function CardOption(props: CardOptionProps) {
  return (
    <SelectableCard selected={props.selected} onSelect={props.onSelect}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          padding: 2,
          '& > *': {
            color: props.selected ? '#fff' : undefined,
          },
        }}
      >
        {props.icon}
        <Stack direction="column">
          <Typography>{props.title}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {props.label}
          </Typography>
        </Stack>
      </Stack>
    </SelectableCard>
  );
}

type Service = 'website' | 'app' | 'industry' | 'other';
interface ContactUsValue {
  readonly name?: string;
  readonly companyAge?: 'old' | 'new' | 'private';
  readonly services: Service[];
  readonly message?: string;
  readonly email?: string;
  readonly privacy?: boolean;
}

interface Step {
  readonly key: keyof ContactUsValue;
  readonly title: string;
  readonly description: string;
  readonly content: ReactNode;
  readonly validators: Validator[];
}

export default function ContactUs() {
  const { navigate } = useNextNavigator();
  const { t } = useLanguage();
  const contactUsApi = useContactUs().api;

  const [loading, setLoading] = useState<boolean>(false);

  const [step, setStep] = useState(0);
  const [formValue, setFormValue] = useState<ContactUsValue>({
    privacy: true,
    services: [],
  });

  const handleChange = <T extends keyof ContactUsValue>(
    key: T,
    value: ContactUsValue[T]
  ) => {
    const newFormValue: ContactUsValue = {
      ...(formValue ?? ({} as ContactUsValue)),
      [key]: value,
    };

    setFormValue(newFormValue);
  };

  const addOrRemoveService = (service: Service) => {
    const isAlreadyIn = !!formValue.services?.some((s) => s === service);
    const newServices = [...(formValue.services ?? [])];

    isAlreadyIn
      ? _.remove(newServices, (s) => s === service)
      : newServices.push(service);

    handleChange('services', newServices);
  };

  const isValid = (key: keyof ContactUsValue, validators: Validator[]) => {
    return validators.every((v) => v(formValue[key]));
  };

  const steps: Step[] = [
    {
      key: 'name',
      title: t('contact-step-1-title'),
      description: t('contact-step-1-description'),
      validators: [Validators.required],
      content: (
        <TextField
          required
          variant="outlined"
          label={t('contact-us-step-1-label')}
          color="secondary"
          value={formValue?.name ?? ''}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      ),
    },
    {
      key: 'companyAge',
      title: t('contact-step-2-title'),
      description: t('contact-step-2-description'),
      validators: [Validators.required],
      content: (
        <Stack direction="column" spacing={2}>
          <CardOption
            key="new"
            icon={<StoreRounded fontSize="large" />}
            title={t('new-company')}
            label={t('new-company-description')}
            selected={formValue?.companyAge === 'new'}
            onSelect={() => handleChange('companyAge', 'new')}
          />
          <CardOption
            key="old"
            icon={<BusinessRounded fontSize="large" />}
            title={t('old-company')}
            label={t('old-company-description')}
            selected={formValue?.companyAge === 'old'}
            onSelect={() => handleChange('companyAge', 'old')}
          />
          <CardOption
            key="private"
            icon={<PersonRounded fontSize="large" />}
            title={t('vat-private')}
            label={t('vat-private-description')}
            selected={formValue?.companyAge === 'private'}
            onSelect={() => handleChange('companyAge', 'private')}
          />
        </Stack>
      ),
    },
    {
      key: 'services',
      title: t('contact-step-3-title'),
      description: t('contact-step-3-description'),
      validators: [Validators.min(1)],
      content: (
        <Stack direction="column" spacing={2}>
          <CardOption
            key="website"
            icon={<DevicesRounded fontSize="large" />}
            title={t('website-card')}
            label={t('website-card-description')}
            selected={!!formValue?.services?.some((s) => s === 'website')}
            onSelect={() => addOrRemoveService('website')}
          />
          <CardOption
            key="app"
            icon={<PhoneIphoneRounded fontSize="large" />}
            title={t('app-card')}
            label={t('app-card-description')}
            selected={!!formValue?.services?.some((s) => s === 'app')}
            onSelect={() => addOrRemoveService('app')}
          />
          <CardOption
            key="industry"
            icon={<FactoryRounded fontSize="large" />}
            title={t('industry-card')}
            label={t('industry-card-description')}
            selected={!!formValue?.services?.some((s) => s === 'industry')}
            onSelect={() => addOrRemoveService('industry')}
          />
          <CardOption
            key="other"
            icon={<QuestionMarkRounded fontSize="large" />}
            title={t('other-card')}
            label={t('other-card-description')}
            selected={!!formValue?.services?.some((s) => s === 'other')}
            onSelect={() => addOrRemoveService('other')}
          />
        </Stack>
      ),
    },
    {
      key: 'message',
      title: t('contact-step-4-title'),
      description: t('contact-step-4-description'),
      validators: [Validators.required],
      content: (
        <TextField
          required
          variant="outlined"
          label={t('message')}
          color="secondary"
          multiline
          rows={6}
          value={formValue?.message ?? ''}
          onChange={(e) => handleChange('message', e.target.value)}
        />
      ),
    },
    {
      key: 'email',
      title: t('contact-step-5-title'),
      description: t('contact-step-5-description'),
      validators: [
        Validators.required,
        Validators.isAnEmail,
        () => !!formValue.privacy,
      ],
      content: (
        <>
          <TextField
            required
            variant="outlined"
            label={t('email')}
            color="secondary"
            value={formValue?.email ?? ''}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          <PrivacyCheckBox
            privacyUrl="/policies-licenses"
            value={formValue?.privacy}
            onChange={(e) => handleChange('privacy', e.target.value)}
          />
        </>
      ),
    },
  ];

  const increase = () => {
    const isNotValid = isValid(steps[step].key, steps[step].validators);

    if (step >= steps.length - 1 || !isNotValid) return;

    setStep((step) => step + 1);
  };

  const decrease = () => {
    if (step <= 0) return;

    setStep((step) => step - 1);
  };

  const getNext = () => {
    return step === steps.length - 1 ? send : increase;
  };

  const send = () => {
    setLoading(true);

    contactUsApi.contactUs
      .process({
        name: formValue.name ?? '',
        email: formValue.email ?? '',
        message: formValue.message,
        companyType: formValue.companyAge,
        services: formValue.services.join(','),
      })
      .then(() => navigate('/message-sent'))
      .finally(() => setLoading(false));
  };

  return (
    <Page>
      <Sections>
        <Section>
          <Stack
            direction="column"
            alignItems="center"
            spacing={4}
            sx={{ width: '100%', padding: 2 }}
          >
            <Typography variant="h2">{t('contact-us-title')}</Typography>
            <Stack
              direction="column"
              spacing={2}
              sx={{
                maxWidth: 600,
                width: '100%',
              }}
            >
              <Typography variant="h4">{steps[step].title}</Typography>
              <Typography>{steps[step].description}</Typography>
              {steps[step].content}
              <Stack direction="row" justifyContent="flex-end" spacing={2}>
                <MaybeShow show={step !== 0}>
                  <Button
                    size="large"
                    color="inherit"
                    disabled={loading}
                    onClick={decrease}
                  >
                    {t('back')}
                  </Button>
                </MaybeShow>
                <LoadingButton
                  loading={loading}
                  size="large"
                  variant="contained"
                  disabled={!isValid(steps[step].key, steps[step].validators)}
                  onClick={getNext()}
                >
                  {step === steps.length - 1 ? t('send') : t('next')}
                </LoadingButton>
              </Stack>
            </Stack>
          </Stack>
        </Section>
      </Sections>
    </Page>
  );
}
