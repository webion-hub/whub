import { ChildrenProps } from '@wui/core';
import { FooterColumn } from '@wui/layout/Footer';

export const LinksFooterColumn = (props: ChildrenProps) => {
  return (
    <FooterColumn
      spacing={2}
      alignItems={{ xs: 'center', md: 'flex-start' }}
      sx={{
        paddingLeft: { xs: 0, md: 6 },
        marginTop: { xs: 6, md: 0 },
        width: '100%',
        '& > *': {
          textAlign: { xs: 'center', md: 'left' },
        },
      }}
    >
      {props.children}
    </FooterColumn>
  );
};
